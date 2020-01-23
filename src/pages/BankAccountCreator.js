import React, { Component } from 'react';
import Spinner from '../components/spinner';
import EntityCreatorView from '../components/entity-creator-view';
import crmApi from '../services/crm-api';
import { withRouter } from 'react-router-dom';
import { getEmptyEntity, setMainField } from '../data-model/data-converter';
import { Button, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const StyledButton = withStyles({
    root: {
        background: '#43a047',
        color: '#fff',
        fontFamily: 'SegoeUIRegular'
    }
})(Button);

class BankAccountCreator extends Component {
    state = {
        data: getEmptyEntity('bank-account'),
        isLoading: false
    }

    handleFieldChange = event => {
        event.persist();
        this.setState(state => {
            return {
                data: {
                    ...state.data,
                    [event.target.name]: event.target.value
                }
            }
        });
    }

    handleChangeDate = (value, name) => {
        this.setState(state => {
            return {
                data: {
                    ...state.data,
                    [name]: value
                }
            }
        })
    }

    createEntity = () => {
        this.setState({
            isLoading: true
        })
        const { data } = this.state;
        crmApi.createNewEntity('bankaccount', data)
            .then(status => {
                if (status) {
                    this.props.history.push(`/bank-account`);
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                });
                console.error(err);
            });
    }

    handleLookUpFieldChange = (event, data, name) => {
        const mainFieldName = setMainField(name);
        event.persist();
        this.setState(state => {
            return {
                data: {
                    ...state.data,
                    [name]: typeof data === 'object' && data !== null ? {
                        _id: data._id,
                        [mainFieldName]: data[mainFieldName]
                    } : ''
                }
            }
        });
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
                    handleLookUpFieldChange={this.handleLookUpFieldChange}
                    createEntity={this.createEntity}
                    field='bank-account'
                    data={data}
                />
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

export default withRouter(BankAccountCreator);