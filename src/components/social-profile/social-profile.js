import React, { useState, useEffect, useCallback } from 'react';
import {
    makeStyles,
    IconButton,
    CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import crmApi from '../../services/crm-api';
import RemoveIcon from '@material-ui/icons/Remove';
import {
    StyledCard,
    StyledCardHeader,
    StyledCardContent,
} from './styled-components';
import SocialProfileItem from './social-profile-item';
import EmptySocialProfile from './empty-social-profile';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 2,
        background: '#f2f2f2',
        borderRadius: 3
    },
    loaderRoot: {
        padding: '10px !important',
        textAlign: 'center'
    }
}));

const SocialProfile = ({ partyid }) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idEditableProfile, setIdEditableProfile] = useState('');
    const [isProfileCreatorOpen, setIsProfileCreatorOpen] = useState(false);

    const getProfiles = useCallback((...callbacks) => {
        async function getData() {
            await crmApi.fetchSocialProfiles(partyid)
                .then(data => {
                    setData(data);
                    setLoading(false);
                })

            if (callbacks.length) {
                callbacks.forEach(callback => callback());
            }
        }

        getData();

    }, [partyid]);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getProfiles();
        }

        return () => {
            mounted = false;
        }
    }, [getProfiles]);

    const openEditableMode = (id) => {
        setIdEditableProfile(id);
    };

    const toggleProfileCreatorVisibility = () => {
        setIsProfileCreatorOpen(!isProfileCreatorOpen);
    }

    const closeProfileCreator = () => {
        setIsProfileCreatorOpen(false);
    }

    const closeEditableMode = () => {
        setIdEditableProfile('');
    }

    const handleEditProfile = async (id, data, showLoader) => {
        await crmApi.updateFields('socialprofile', id, data)
            .then(status => {
                if (status) {
                    getProfiles(showLoader, closeEditableMode);
                }
            });
    };

    const handleDeleteProfile = async (id, showLoader) => {
        await crmApi.deleteEntity('socialprofile', id)
            .then(async status => {
                if (status) {
                    getProfiles();
                }
            })
    }

    const handleAddNewProfile = async (data, showLoader) => {
        await crmApi.createNewEntity('socialprofile', data)
            .then(res => {
                if (res) {
                    getProfiles(showLoader, closeProfileCreator);
                }
            })
    }

    return (
        <StyledCard>
            <StyledCardHeader
                title={
                    <>
                        <span>Social Profile</span>
                        <div>
                            <IconButton
                                className={classes.root}
                                onClick={toggleProfileCreatorVisibility}
                            >
                                {isProfileCreatorOpen ? <RemoveIcon /> : <AddIcon />}
                            </IconButton>
                        </div>
                    </>
                }
            />
            <StyledCardContent className={!data.length ? classes.loaderRoot : null}>
                {loading ? (
                    <CircularProgress
                        size={30}
                    />
                ) : (
                        <>
                            {isProfileCreatorOpen ? (
                                <EmptySocialProfile
                                    partyid={partyid}
                                    handleAddNewProfile={handleAddNewProfile}
                                    closeProfileCreator={closeProfileCreator}
                                />
                            ) : null}
                            {data.map(profileItem => {
                                const editMode = idEditableProfile === profileItem._id;
                                return (
                                    <SocialProfileItem
                                        key={profileItem._id}
                                        profile={profileItem}
                                        editMode={editMode}
                                        openEditableMode={openEditableMode}
                                        closeEditableMode={closeEditableMode}
                                        editProfile={handleEditProfile}
                                        deleteProfile={handleDeleteProfile}
                                    />
                                )
                            })}
                        </>
                    )}
            </StyledCardContent>
        </StyledCard>
    )
}

export default SocialProfile;