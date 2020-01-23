import React, { useState } from 'react';
import LookUp from '../../controls/look-up';
import OptionSet from '../../controls/option-set';
import TextField from '../../controls/text-field';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
    makeStyles,
    FormControl,
    IconButton,
    CircularProgress
} from '@material-ui/core';
import { SocialProfileStatusTypes } from '../../../data-model/case';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        '&:nth-child(1)': {
            paddingTop: 0
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
            '&::before': {
                display: 'none'
            }
        }
    },
    item: {
        boxSizing: 'border-box',
        width: '50%',
        padding: 5
    },
    leftSide: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: '2.7'
    },
    rightSide: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: '0.3',
    },
    labelWrapper: {
        marginBottom: 16
    },
    inputWidth: {
        width: '100%'
    },
    label: {
        fontSize: 11,
        color: 'rgb(76, 76, 81)',
        textTransform: 'uppercase'
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
    actionContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
}));

const EmptySocialProfile = ({closeProfileCreator, partyid, handleAddNewProfile}) => {
    const classes = useStyles();
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        socialplatformid: {
            _id: '',
            name: ''
        },
        link: '',
        status: ''
    });

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

    const addNewProfile = () => {
        setIsProfileLoading(true);
        handleAddNewProfile({
            partyid,
            ...profileData
        }, setIsProfileLoading)
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftSide}>
                <FormControl className={classes.item}>
                    <div className={classes.labelWrapper}>
                        <label className={classes.label}>Social Platform</label>
                    </div>
                    <LookUp
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

            </div>
            <div className={classes.rightSide}>
                {isProfileLoading ? (
                    <CircularProgress
                        size={30}
                    />
                ) : (
                        <div className={classes.actionContainer}>
                            <IconButton
                                className={classes.icon}
                                onClick={closeProfileCreator}
                            >
                                <ClearIcon />
                            </IconButton>
                            <IconButton
                                className={classes.icon}
                                onClick={addNewProfile}
                            >
                                <CheckIcon />
                            </IconButton>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default EmptySocialProfile;