import React, { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {
    TextareaAutosize,
    IconButton,
    makeStyles,
    CircularProgress
} from '@material-ui/core';

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
    textArea: {
        width: '100%',
        marginRight: 0,
        padding: '3px 12px',
        fontSize: 13,
        fontFamily: 'SegoeUIRegular',
        border: '1px solid #D9D9D9',
        borderRadius: 4,
        color: '#4C4C51',
        boxSizing: 'border-box'
    },
    action: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: '0.3'
    },
    textSide: {
        flexGrow: '2.7'
    }
}))

const EmptyComment = ({addComment, handleCloseCommentPanel, partyid}) => {
    const classes = useStyles();
    const [commentText, setCommentText] = useState('');
    const [isCommentsUploaded, setIsCommentsUploaded] = useState(false);

    const handleChangeCommentText = (event) => {
        setCommentText(event.target.value);
    }

    const uploadComment = () => {
        setIsCommentsUploaded(true);
        addComment(commentText, partyid);
    }

    return (
        <div className={classes.root}>
            <div className={classes.textSide}>
                <TextareaAutosize
                    className={classes.textArea}
                    onChange={handleChangeCommentText}
                    rowsMin={4}
                    value={commentText}
                />
            </div>
            <div className={classes.action}>
                {isCommentsUploaded ? (
                    <CircularProgress
                        size={30}
                    />
                ) : (
                        <>
                            <IconButton
                                className={classes.icon}
                                onClick={handleCloseCommentPanel}
                            >
                                <ClearIcon />
                            </IconButton>
                            <IconButton
                                className={classes.icon}
                                disabled={!commentText.trim()}
                                onClick={uploadComment}
                            >
                                <CheckIcon />
                            </IconButton>
                        </>
                    )}
            </div>
        </div>
    )
};

export default EmptyComment;