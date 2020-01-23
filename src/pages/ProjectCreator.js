import React, { useState } from 'react';
import Spinner from '../components/spinner';
import EntityCreatorView from '../components/entity-creator-view';
import crmApi from '../services/crm-api';
import { getEmptyEntity, setMainField } from '../data-model/data-converter';
import { Button, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import useReactRouter from 'use-react-router';

const StyledButton = withStyles({
    root: {
        background: '#43a047',
        color: '#fff',
        fontFamily: 'SegoeUIRegular'
    }
})(Button);

const ProjectCreator = () => {
    const [data, setData] = useState(getEmptyEntity('project'));
    const [isLoading, setIsLoading] = useState(false);
    const { history } = useReactRouter();

    const handleFieldChange = event => {
        event.persist();
        setData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangeDate = (value, name) => {
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleLookUpFieldChange = (event, data, name) => {
        const mainFieldName = setMainField(name);
        event.persist();

        setData(currentData => {
            if (name === 'managerid') {
                return {
                    ...currentData,
                    'managerid': typeof data === 'object' && data !== null ? {
                        _id: data._id,
                        firstname: data['firstname'],
                        lastname: data['lastname']
                    } : ''
                }
            }

            return {
                ...currentData,
                [name]: typeof data === 'object' && data !== null ? {
                    _id: data._id,
                    [mainFieldName]: data[mainFieldName]
                } : ''
            }
        })
    }

    const createEntity = () => {
        setIsLoading(true);
        crmApi.createNewEntity('project', data)
            .then(status => {
                if (status) {
                    history.push(`/project`);
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.error(err);
            });
    }

    if (!data) return <Spinner />

    return (
        <>
            {!isLoading ? <div style={{height: '4px'}}></div> : <LinearProgress />}
            <EntityCreatorView
                handleFieldChange={handleFieldChange}
                handleChangeDate={handleChangeDate}
                handleLookUpFieldChange={handleLookUpFieldChange}
                createEntity={createEntity}
                field='project'
                data={data}
            />
            <StyledButton
                disabled={isLoading}
                variant="contained"
                onClick={createEntity}
            >
                Create
            </StyledButton>
        </>
    )
}

export default ProjectCreator;