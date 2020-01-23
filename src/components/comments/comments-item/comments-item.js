import React, { useState } from 'react';
import {
    Typography,
    makeStyles,
    IconButton,
    TextareaAutosize
} from '@material-ui/core';
import { CalendarIcon } from '../../icons';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
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
    icon: {
        padding: 2,
        background: '#f2f2f2',
        borderRadius: 3,
        marginRight: 5,
        '&:last-child': {
            marginRight: 0
        }
    },
    textRoot: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '2.7'
    },
    typography: {
        fontFamily: 'SegoeUIRegular',
        fontSize: 14,
        lineHeight: '22px'
    },
    additionalText: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'SegoeUIRegular',
        fontSize: 12,
        lineHeight: '22px',
        color: '#828282'
    },
    textArea: {
        marginRight: 0,
        padding: '3px 12px',
        fontSize: 13,
        fontFamily: 'SegoeUIRegular',
        border: '1px solid #D9D9D9',
        borderRadius: 4,
        color: '#4C4C51'
    },
    actionRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: '0.3',
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

const CommentsItem = ({ comment, handleDelete, editComment }) => {
    const classes = useStyles();
    const [isCommentsUploaded, setIsCommentsUploaded] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [commentText, setCommentText] = useState(comment.text);

    const changeCommentText = (event) => {
        setCommentText(event.target.value);
    }

    const closeEditableMode = () => {
        setCommentText(comment.text);
        setIsEditable(false);
    }

    const openEditableMood = () => {
        setIsEditable(true);
    }

    const closeEditableMood = () => {
        setIsEditable(false);
    };

    const setCommentsUploadStatus = () => {
        setIsCommentsUploaded(false);
    }

    const setCommentChanges = () => {
        setIsCommentsUploaded(true);
        editComment(comment._id, commentText, closeEditableMood, setCommentsUploadStatus);
    }

    const deleteComment = () => {
        setIsCommentsUploaded(true);
        handleDelete(comment._id)
    }

    return (
        <div className={classes.root}>
            <div className={classes.textRoot}>
                {isEditable ? (
                    <TextareaAutosize
                        disabled={isCommentsUploaded}
                        className={classes.textArea}
                        aria-label="empty textarea"
                        rowsMin={4}
                        value={commentText}
                        onChange={changeCommentText}
                    />
                ) : (
                        <Typography className={classes.typography}>{comment.text}</Typography>
                    )}
                <span className={classes.additionalText}>
                    <CalendarIcon />
                    {" "}
                    {moment(comment.date).format('YYYY.MM.DD')}
                </span>
            </div>
            <div className={classes.actionRoot}>
                {isEditable ? (
                    isCommentsUploaded ? (
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
                                    disabled={commentText === comment.text}
                                    onClick={setCommentChanges}
                                >
                                    <CheckIcon />
                                </IconButton>
                            </div>
                        )
                ) : (
                        isCommentsUploaded ? (
                            <CircularProgress
                                size={30}
                            />
                        ) : (
                                <div className={classes.actionContainer}>
                                    <IconButton
                                        className={classes.icon}
                                        onClick={openEditableMood}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        className={classes.icon}
                                        onClick={deleteComment}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            )
                    )}
            </div>
        </div>
    )
};

export default CommentsItem;