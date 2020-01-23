import React, { useState, useEffect, useCallback } from 'react';
import {
    StyledCard,
    StyledCardHeader,
    StyledCardContent,
} from './styled-components';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
    IconButton,
    makeStyles,
    CircularProgress
} from '@material-ui/core';
import CommentsItem from './comments-item';
import crmApi from '../../services/crm-api';
import EmptyComment from './empty-comment';

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
}))

const Comments = ({ partyid }) => {
    const classes = useStyles();
    const [commentsData, setCommentsData] = useState(null);
    const [isAddedOpen, setIsAddedOpen] = useState(false);

    const fetchCommentsData = useCallback((...args) => {
        async function getComments() {
            await crmApi.fetchComments(partyid)
                .then(commentsData => {
                    setCommentsData(commentsData);
                })

            args.forEach(arg => {
                arg();
            });
        }

        getComments();
    }, [partyid]);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            fetchCommentsData();
        }

        return () => {
            mounted = false;
        }

    }, [fetchCommentsData]);

    const handleToggleCommentPanel = () => {
        setIsAddedOpen(!isAddedOpen);
    }

    const handleCloseCommentPanel = () => {
        setIsAddedOpen(false);
    }

    const handleEditComment = (id, text, ...args) => {
        crmApi.updateFields('comment', id, {
            partyid,
            text
        })
            .then(status => {
                if (status) {
                    fetchCommentsData(...args);
                }
            })
    }

    const handleDeleteComment = (id, ...args) => {
        crmApi.deleteEntity('comment', id)
            .then(comments => {
                if (comments) {
                    fetchCommentsData(...args);
                }
            })
    };

    const handleAddComment = (text, partyid, ...args) => {
        crmApi.createNewEntity('comment', {
            partyid,
            text,
            date: new Date()
        })
            .then(res => {
                if (res) {
                    fetchCommentsData(handleCloseCommentPanel, ...args)
                }
            })
    }

    return (
        <StyledCard>
            <StyledCardHeader
                title={
                    <>
                        <span>Comments</span>
                        <div className="actions">
                            <IconButton
                                className={classes.root}
                                onClick={handleToggleCommentPanel}
                            >
                                {isAddedOpen ? <RemoveIcon /> : <AddIcon />}
                            </IconButton>
                        </div>
                    </>
                }
            />
            <StyledCardContent className={!commentsData ? classes.loaderRoot : null}>
                {!commentsData ? (
                    <CircularProgress />
                ) : (
                        <>
                            {isAddedOpen ? (
                                <EmptyComment
                                    addComment={handleAddComment}
                                    partyid={partyid}
                                    handleCloseCommentPanel={handleCloseCommentPanel}
                                />
                            ) : null}
                            {commentsData.map(comment => (
                                <CommentsItem
                                    comment={comment}
                                    key={comment._id}
                                    editComment={handleEditComment}
                                    handleDelete={handleDeleteComment}
                                />
                            ))}
                        </>
                    )}
            </StyledCardContent>
        </StyledCard>
    )
}

export default Comments;