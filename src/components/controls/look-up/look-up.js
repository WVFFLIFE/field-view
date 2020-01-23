import React, { PureComponent } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import crmApi from '../../../services/crm-api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getMainField, setMainField } from '../../../data-model/data-converter';
import PropTypes from 'prop-types';

const StyledAutoComplete = withStyles({
    inputRoot: {
        width: '100%',
        padding: '0 12px 0 12px !important',
        fontFamily: 'SegoeUIRegular',
        fontSize: '13px',
        color: '#4C4C51'
    },
    option: {
        padding: '10px',
        fontFamily: 'SegoeUIRegular',
        fontSize: '13px',
        color: '#4C4C51'
    }
})(Autocomplete);

export default class LookUp extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        changeHandler: PropTypes.func.isRequired,
        updateHandler: PropTypes.func,
        value: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string
        }),
        disabled: PropTypes.bool
    }

    state = {
        open: false,
        lookUpLoading: false,
        lookUpData: []
    }

    fetchLookUpData = (field) => {
        this.setState({
            lookUpLoading: true
        })
        crmApi.getData(getMainField(field))
            .then(data => {
                this.setState(state => {
                    return {
                        ...state,
                        lookUpLoading: false,
                        lookUpData: data
                    }
                })
            })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })

        if (this.state.lookUpData.length === 0) {
            const path = this.props.name;

            this.fetchLookUpData(path);
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    setOptionLabel = (option) => {
        const {name} = this.props;
        if (name === 'ownerid' || name === 'managerid') {
            return `${option.firstname} ${option.lastname}`
        }
        
        return option[setMainField(name)]
    }

    render() {
        const { name, value, changeHandler, updateHandler, disabled } = this.props;
        const { open, lookUpData, lookUpLoading } = this.state;
        const {handleOpen, handleClose} = this;

        return (
            <StyledAutoComplete
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                options={lookUpData}
                onChange={changeHandler}
                onBlur={updateHandler ? updateHandler : null}
                getOptionLabel={this.setOptionLabel}
                loading={lookUpLoading}
                disabled={disabled}
                value={value}
                disableClearable={true}
                renderInput={params => {
                    return (
                        <TextField 
                            {...params}
                            name={name}
                            value={value.name}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {lookUpLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                )
                            }}
                        />
                    )
                }}
            />
        )
    }
}