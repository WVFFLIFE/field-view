import React, { useState, useCallback } from 'react';
import {
    Card,
    CardContent
} from '@material-ui/core';
import FilesDropZone from '../../components/filesdropzone';
import crmApi from '../../services/crm-api';
import { useAuth0 } from '../../react-auth0-spa';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    cardContent: {
        [theme.breakpoints.down('md')]: {
            '&:last-child': {
                padding: 10
            }
        }
    }
}))

const EntityAssets = ({mainid = null, getData = null}) => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [requestStatus, setRequestStatus] = useState(false);
    const { getTokenSilently } = useAuth0();
    
    const handleDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => {
            return prevFiles.filter(t => t.path === acceptedFiles[0].path).length === 0 ? [...prevFiles].concat(acceptedFiles) : [...prevFiles]
        })
    }, []);

    const removeFile = (name) => {
        setFiles(prevFiles => prevFiles.filter(item => item.name !== name))
    }

    const handleRemoveAll = () => {
        setFiles([]);
    }

    const uploadFiles = async () => {
        setRequestStatus(true);
        const token = await getTokenSilently();

        const formData = new FormData();
        for (const file of files) {
            formData.append('file', file, file.name)
        }

        crmApi.createNewFile(formData, mainid, token)
            .then(async res => {
                if (res) {
                    await getData();
                    setRequestStatus(false);
                    handleRemoveAll();
                }
            });
    }

    return (
        <Card>
            <CardContent className={classes.cardContent}>
                <FilesDropZone
                    files={files}
                    handleRemoveAll={handleRemoveAll}
                    handleDrop={handleDrop}
                    removeFile={removeFile}
                    uploadFiles={uploadFiles}
                    requestStatus={requestStatus}
                />
            </CardContent>
        </Card>
    )
}

export default EntityAssets;