import React, {useState} from 'react';
import {
    List,
    Card,
    CardContent,
    LinearProgress
} from '@material-ui/core';
import FileLoader from '../../components/file-loader';
import { useAuth0 } from '../../react-auth0-spa';
import crmApi from '../../services/crm-api';
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

const Files = ({ files, filesContainer, getData }) => {
    const classes = useStyles();
    const { getTokenSilently } = useAuth0();
    const [requestStatus, setRequestStatus] = useState(false);

    const removeFile = async (containerId, mediaid) => {
        setRequestStatus(true);
        const token = await getTokenSilently();

        crmApi.deleteEntityFileWithToken(mediaid, containerId, token)
            .then(async status => {
                if (status) {
                    await getData();
                    setRequestStatus(false);
                }
            })
    }

    return (
        <>
            {requestStatus ? <LinearProgress /> : <div style={{height: 4}}></div>}
            <Card>
                <CardContent className={classes.cardContent}>
                    <List>
                        {files.map(file => {
                            const [container] = filesContainer.filter(item => item.contentid === file._id);

                            return (
                                <FileLoader
                                    key={file._id}
                                    file={file}
                                    containerId={container._id}
                                    getData={getData}
                                    removeFile={removeFile}
                                />
                            )
                        })}
                    </List>
                </CardContent>
            </Card>
        </>
    )
}

export default Files;