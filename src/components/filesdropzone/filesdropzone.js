import React from 'react';
import uuid from 'uuid/v1';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    LinearProgress,
    colors
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import addFile from '../../assets/add-file.svg';
import {bytesToSize} from '../../utils';

const StyledListItemText = withStyles(theme => ({
    primary: {
        fontFamily: 'SegoeUIRegular',
        fontSize: 18,
        [theme.breakpoints.down('md')]: {
            fontSize: 14
        }
    },
    secondary: {
        fontFamily: 'SegoeUIRegular',
        fontSize: 14,
        [theme.breakpoints.down('md')]: {
            fontSize: 12
        }
    }
}))(ListItemText);

const useStyles = makeStyles(theme => ({
    root: {
        fontFamily: 'SegoeUIRegular',
        fontSize: '21px'
    },
    dropZone: {
        border: `1px dashed grey`,
        padding: 24,
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        transition: '.2s ease-in-out',
        '&:hover': {
            backgroundColor: colors.grey[50],
            opacity: 0.8,
            cursor: 'pointer'
        }
    },
    dragActive: {
        backgroundColor: colors.grey[50],
        opacity: 0.5
    },
    image: {
        width: 130
    },
    mainInfo: {
        fontFamily: 'SegoeUIRegular',
        fontSize: 24
    },
    info: {
        marginTop: 8,
        fontFamily: 'SegoeUIRegular',
        fontSize: 15
    },
    actions: {
        marginTop: 8,
        display: 'flex',
        justifyContent: 'flex-end',
        '& > * + *': {
            marginLeft: 16
        }
    },
    buttonAdd: {
        fontFamily: 'SegoeUIRegular',
        background: '#3f51b5',
        color: '#fff',
        transition: '.2s ease-in-out',
        '&:hover': {
            background: '#3f51b5',
            opacity: 0.8
        }
    },
    buttonRemove: {
        fontFamily: 'SegoeUIRegular',
    },
    listItemIcon: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 35
        }
    },
    listItem: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 8,
            paddingRight: 8,
        }
    },
    controlIcons: {
        [theme.breakpoints.down('sm')]: {
            padding: 3
        }
    }
}));

const FilesDropZone = ({ creator = false, requestStatus, uploadFiles, handleRemoveAll, removeFile, files, handleDrop }) => {
    const classes = useStyles();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
    })

    return (
        <>
            {requestStatus ? <LinearProgress /> : <div style={{height: 4}}></div>}
            <div
                className={clsx(classes.root)}
            >
                <div
                    className={clsx({
                        [classes.dropZone]: true,
                        [classes.dragActive]: isDragActive
                    })}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} multiple={false}/>
                    <div>
                        <img
                            alt="Select File"
                            className={classes.image}
                            src={addFile}
                        />
                    </div>
                    <div>
                        <Typography
                            className={classes.mainInfo}
                            gutterBottom
                            variant="h3"
                        >
                            Select files
                        </Typography>
                        <Typography
                            className={classes.info}
                            color="textSecondary"
                            variant="body1"
                        >
                            Drop files here or click
                            {' '}
                            <Link underline="always">browse</Link>
                        </Typography>
                    </div>
                </div>
                {files.length > 0 && (
                    <>
                        <List className={classes.list}>
                            {files.map((file, i) => (
                                <div key={uuid()}>
                                    <ListItem className={classes.listItem}>
                                        <ListItemIcon className={classes.listItemIcon}>
                                            <FileCopyIcon />
                                        </ListItemIcon>
                                        <StyledListItemText
                                            primary={file.name}
                                            primaryTypographyProps={{ variant: 'h5' }}
                                            secondary={bytesToSize(file.size)}
                                        />
                                        <ListItemIcon className={classes.listItemIcon}>
                                            <IconButton onClick={() => removeFile(file.name)} className={classes.controlIcons}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                        </List>
                        <div className={classes.actions}>
                            {!creator ? (
                                <>
                                    <Button
                                        onClick={handleRemoveAll}
                                        className={classes.buttonRemove}
                                        size="small"
                                    >
                                        Remove all
                                    </Button>
                                    <Button
                                        onClick={uploadFiles}
                                        className={classes.buttonAdd}
                                        size="small"
                                        variant="contained"
                                    >
                                        Upload files
                                    </Button>
                                </>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default FilesDropZone