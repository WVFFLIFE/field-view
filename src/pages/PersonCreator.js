import React, { Component } from 'react';
import Spinner from '../components/spinner';
import EntityCreatorView from '../components/entity-creator-view';
import crmApi from '../services/crm-api';
import { withRouter } from 'react-router-dom';
import { Button, LinearProgress } from '@material-ui/core';
import { getEmptyEntity, setMainField } from '../data-model/data-converter';
import {_objectWithoutProperties} from '../utils';
import { withStyles } from '@material-ui/styles';

const StyledButton = withStyles({
    root: {
        background: '#43a047',
        color: '#fff',
        fontFamily: 'SegoeUIRegular'
    }
})(Button);

class PersonCreator extends Component {
    state = {
        data: {
            party: {
                ...getEmptyEntity('party'),
                derivedtypes: ['person']
            },
            person: getEmptyEntity('person')
        },
        isLoading: false
    }

    

    handleFieldChange = (event, parent) => {
        event.persist();

        const val = event.target.value[event.target.value.length - 1];

        if (event.target.name === 'derivedtypes' && !(val in this.state.data)) {
            this.setState(state => {
                return {
                    data: {
                        ...state.data,
                        [val]: getEmptyEntity(val),
                        party: {
                            ...state.data.party,
                            derivedtypes: event.target.value
                        },
                    }
                }
            })

            return;
        }

        this.setState(state => {
            return {
                data: {
                    ...state.data,
                    [parent]: {
                        ...state.data[parent],
                        [event.target.name]: event.target.value
                    }
                }
            }
        });
    }

    handleChangeDate = (value, name, parent) => {
        this.setState(state => {
            return {
                data: {
                    ...state.data,
                    [parent]: {
                        ...state.data[parent],
                        [name]: value
                    }
                }
            }
        });
    }

    handleLookUpFieldChange = (event, data, name, parent) => {
        const mainFieldName = setMainField(name);
        event.persist();
        this.setState(state => {
            return {
                data: {
                    ...state.data,
                    [parent]: {
                        ...state.data[parent],
                        [name]: typeof data === 'object' && data !== null ? {
                            _id: data._id,
                            [mainFieldName]: data[mainFieldName]
                        } : ''
                    }
                }
            }
        });
    }

    createEntity = async () => {
        this.setState({
            isLoading: true
        })
        const { data } = this.state;

        // create party if derivedtypes field is empty

        if (Object.keys(data).length === 1) {
            crmApi.createNewEntity('party', data['party'])
                .then(status => {
                    if (status) {
                        this.props.history.push(`/person`);
                    }
                })
                .catch(err => {
                    this.setState({
                        isLoading: false
                    });
                    console.error(err);
                });

            return;
        }

        // create party entity and entities which Derived Types field contains and link them with party

        await crmApi.createNewParty(data['party'])
            .then(updatedData => {
                Object.keys(_objectWithoutProperties(data, ['party'])).map(field => {
                    this.setState(state => {
                        return {
                            data: {
                                ...state.data,
                                [field]: {
                                    ...state.data[field],
                                    partyid: updatedData._id
                                }
                            }
                        }
                    })

                    return false;
                });

                Object.keys(_objectWithoutProperties(this.state.data, ['party'])).map(async field => {
                    await crmApi.createNewEntity(field, this.state.data[field])
                        .then(status => {
                            if (status) {
                                this.props.history.push(`/person`);
                            }
                        })
                        .catch(err => {
                            this.setState({
                                isLoading: false
                            });
                            console.error(err);
                        });

                    return false;
                })
            })
    }

    render() {
        const { data, isLoading } = this.state;

        if (!data) {
            return <Spinner />
        }

        return (
            <>
                {!isLoading ? <div style={{height: '4px'}}></div> : <LinearProgress />}
                <EntityCreatorView
                    handleFieldChange={this.handleFieldChange}
                    handleChangeDate={this.handleChangeDate}
                    createEntity={this.createEntity}
                    handleLookUpFieldChange={this.handleLookUpFieldChange}
                    field='party'
                    parent="party"
                    data={data.party}
                />
                {data.party.derivedtypes.map(type => (
                    <EntityCreatorView
                        key={type}
                        parent={type}
                        handleFieldChange={this.handleFieldChange}
                        handleChangeDate={this.handleChangeDate}
                        handleLookUpFieldChange={this.handleLookUpFieldChange}
                        field={type}
                        data={data[type]}
                    />   
                ))}
                <StyledButton
                    disabled={isLoading}
                    variant="contained"
                    onClick={this.createEntity}
                >
                    Create
                </StyledButton>
            </>
        )
    }
}

export default withRouter(PersonCreator);