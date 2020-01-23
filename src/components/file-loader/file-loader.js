import React from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider
} from '@material-ui/core';
import clsx from 'clsx';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { withStyles } from '@material-ui/core/styles';
import { bytesToSize } from '../../utils';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';

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
    listItem: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: 8,
            paddingRight: 8,
        }
    },
    download: {
        marginRight: 8,
        fontSize: 13,
        fontFamily: 'SegoeUIRegular',
        transition: '.3s ease-in-out',
    },
    delete: {
        fontSize: 13,
        fontFamily: 'SegoeUIRegular',
        transition: '.3s ease-in-out',
    },
    listItemIcon: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 35
        }
    },
    controlIcons: {
        [theme.breakpoints.down('sm')]: {
            padding: 3
        }
    }
}))

const FileLoader = ({ file, removeFile, containerId }) => {
    const classes = useStyles();
    
    return (
        <>
            <ListItem className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}>
                    <FileCopyIcon />
                </ListItemIcon>
                <StyledListItemText
                    primary={file.origname}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.filesize)}
                />
                <IconButton
                    className={clsx(classes.download, classes.controlIcons)}
                    href={`https://fieldvision-9f35.restdb.io/media/${file._id}?download=true`}
                    download={file.origname}
                >
                    <GetAppIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.delete, classes.controlIcons)}
                    onClick={() => removeFile(containerId, file._id)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default FileLoader;