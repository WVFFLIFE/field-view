import React, { useState } from 'react';
import LookUp from '../../controls/look-up';
import OptionSet from '../../controls/option-set';
import TextField from '../../controls/text-field';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
    makeStyles,
    FormControl,
    IconButton,
    CircularProgress,
} from '@material-ui/core';
import { SocialProfileStatusTypes } from '../../../data-model/case';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '20px 0',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: 1,
            bottom: 0,
            left: 0,
            right: 0,
            background: '#E8E8E8'
        },
        '&:last-child': {
            paddingBottom: 0,
            '&::before': {
                display: 'none'
            }
        },
    },
    item: {
        boxSizing: 'border-box',
        width: '50%',
        padding: 5,
        [theme.breakpoints.down('md')]: {
            width: '100%',
            paddingBottom: 10
        },
    },
    leftSide: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: '2.7',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            width: '100%'
        },
    },
    rightSide: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: '0.3',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginTop: 7
        },
    },
    labelWrapper: {
        marginBottom: 16,
        [theme.breakpoints.down('md')]: {
            marginBottom: 8
        },
    },
    inputWidth: {
        width: '100%'
    },
    label: {
        fontSize: 11,
        color: 'rgb(76, 76, 81)',
        textTransform: 'uppercase'
    },
    value: {
        fontSize: 14,
        fontFamily: 'SegoeUIBold',
        color: 'rgb(76, 76, 81)',
        [theme.breakpoints.down('md')]: {
            fontSize: 12
        },
    },
    icon: {
        padding: 2,
        background: '#f2f2f2',
        borderRadius: 3,
        marginRight: 5,
        '&:last-child': {
            marginRight: 0
        }
    },
    actionRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: '0.3',
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    textContainer: {
        display: 'block'
    },
    paragraph: {
        margin: '2px 0',
        '&:first-child': {
            marginTop: 0
        },
        '&:last-child': {
            marginBottom: 0
        }
    },
    desktopDivider: {
        height: 50,
        background: 'lightgrey'
    },
    mobileDivider: {
        width: '100%',
        background: 'lightgrey'
    }
}));

const SocialProfileItem = ({ profile, editProfile, editMode, openEditableMode, closeEditableMode, deleteProfile }) => {
    const classes = useStyles();
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        socialplatformid: {
            _id: profile.socialplatformid.length ? profile.socialplatformid[0]._id : '',
            name: profile.socialplatformid.length ? profile.socialplatformid[0].name : ''
        },
        link: profile.link,
        status: profile.status
    });

    const openEdit = () => {
        openEditableMode(profile._id)
    }

    const handleEditProfile = () => {
        setIsProfileLoading(true);
        editProfile(profile._id, profileData, setIsProfileLoading);
    }

    const handleDeleteProfile = () => {
        setIsProfileLoading(true);
        deleteProfile(profile._id, setIsProfileLoading);
    }

    const handleLookUpChange = (e, data) => {
        e.persist();
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            socialplatformid: data
        }))
    }

    const handleStatusChange = (e) => {
        e.persist();
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            status: e.target.value
        }))
    }

    const handleLinkChange = (e) => {
        e.persist();
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            link: e.target.value
        }))
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftSide}>
                {editMode ? (
                    <>
                        <FormControl className={classes.item}>
                            <div className={classes.labelWrapper}>
                                <label className={classes.label}>Social Platform</label>
                            </div>
                            <LookUp
                                path="socialplatform"
                                disabled={isProfileLoading}
                                name="socialplatformid"
                                value={profileData.socialplatformid}
                                changeHandler={handleLookUpChange}
                            />
                        </FormControl>
                        <FormControl className={classes.item}>
                            <div className={classes.labelWrapper}>
                                <label className={classes.label}>Status</label>
                            </div>
                            <OptionSet
                                disabled={isProfileLoading}
                                name="status"
                                value={profileData.status}
                                changeHandler={handleStatusChange}
                                optionSets={SocialProfileStatusTypes}
                            />
                        </FormControl>
                        <FormControl className={classes.item}>
                            <div className={classes.labelWrapper}>
                                <label className={classes.label}>Link</label>
                            </div>
                            <TextField
                                disabled={isProfileLoading}
                                name="link"
                                value={profileData.link}
                                changeHandler={handleLinkChange}
                            />
                        </FormControl>
                    </>
                ) : (
                        <div className={classes.textContainer}>
                            <p className={classes.paragraph}>
                                <span className={classes.label}>Social Platform</span>:
                            {" "}
                                <span className={classes.value}>{profileData.socialplatformid.name}</span>
                            </p>
                            <p className={classes.paragraph}>
                                <span className={classes.label}>Link</span>:
                            {" "}
                                <a
                                    className={classes.value}
                                    href={profileData.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {profileData.link}
                                </a>
                            </p>
                            <p className={classes.paragraph}>
                                <span className={classes.label}>Status</span>:
                            {" "}
                                <span className={classes.value}>{profileData.status}</span>
                            </p>
                        </div>
                    )}
            </div>
            <div className={classes.rightSide}>
                {editMode ? (
                    isProfileLoading ? (
                        <CircularProgress
                            size={30}
                        />
                    ) : (
                            <div className={classes.actionContainer}>
                                <IconButton
                                    className={classes.icon}
                                    onClick={closeEditableMode}
                                >
                                    <ClearIcon />
                                </IconButton>
                                <IconButton
                                    className={classes.icon}
                                    onClick={handleEditProfile}
                                >
                                    <CheckIcon />
                                </IconButton>
                            </div>
                        )
                ) : (
                        isProfileLoading ? (
                            <CircularProgress
                                size={30}
                            />
                        ) : (
                                <div className={classes.actionContainer}>
                                    <IconButton
                                        className={classes.icon}
                                        onClick={openEdit}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        className={classes.icon}
                                        onClick={handleDeleteProfile}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )
                    )}
            </div>
        </div>
    )
}


export default SocialProfileItem;