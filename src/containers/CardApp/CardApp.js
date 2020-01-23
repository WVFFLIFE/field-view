import React, { useState, useEffect, useCallback } from 'react';
import { formModel } from '../../data-model/form';
import { formProps } from '../../data-model/form';
import { setMainField } from '../../data-model/data-converter';
import { _objectWithoutProperties } from '../../utils';
import { useAuth0 } from '../../react-auth0-spa';
import { 
    LinearProgress, 
    makeStyles, 
    ExpansionPanel, 
    ExpansionPanelDetails, 
    ExpansionPanelSummary, 
    Typography 
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    StyledCard,
    StyledCardHeader,
    StyledCardContent,
    StyledFormControl,
} from './styled-components';
import PropTypes from 'prop-types';
import crmApi from '../../services/crm-api';
import {
    DatePicker,
    LookUp,
    Multiline,
    OptionSet,
    TextField
} from '../../components/controls';
import { useMediaQuery } from 'react-responsive';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('md')]: {
            padding: 10
        }
    },
    title: {
        [theme.breakpoints.down('md')]: {
            fontSize: 14
        }
    },
    mobileCardContent: {
        [theme.breakpoints.down('md')]: {
            paddingTop: 10
        }
    },
    formWrapper: {
        boxSizing: 'border-box',
        width: '50%',
        padding: 12,
        [theme.breakpoints.down('md')]: {
            width: '100%',
            padding: 6
        }
    },
    labelWrapper: {
        marginBottom: 16,
        [theme.breakpoints.down('md')]: {
            marginBottom: 8
        }
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            marginBottom: 10
        }
    },
    dropdownIcon: {
        marginRight: 0,
        padding: 2,
        background: '#F2F2F2',
        borderRadius: 3,
    },
    expansionPanelRoot: {
        padding: '0 20px',
        border: '1px solid #e8e8e8',
        borderRadius: 0,
        '&.Mui-expanded': {
            margin: 0
        }
    },
    expansionPanelRounded: {
        '&:last-child': {
            borderRadius: 0
        }
    },
    expansionPanelDetail: {
        flexDirection: 'column',
        padding: 20,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'SegoeUIRegular',
        textTransform: 'uppercase'
    },
    summaryRoot: {
        position: 'relative',
        padding: 0,
        paddingBottom: 20,
        '&.Mui-expanded': {
            minHeight: 48,
        },
        '&::before': {
            content: "''",
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 20,
            width: '100%',
            height: 2,
            background: '#2D7FF9'
        }
    },
    summaryContent: {
        '&.Mui-expanded': {
            margin: 0
        }
    }
}))

const CardApp = ({ field, data, getData, title }) => {
    const classes = useStyles();
    const [tag, setTag] = useState('');
    const [requestStatus, setRequestStatus] = useState(false);
    const [formState, setFormState] = useState(data);
    const { getTokenSilently } = useAuth0();
    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 1280px)'
    })

    const updateFields = async (event, name) => {
        if (!_.isEqual(data[name], formState[name])) {
            setRequestStatus(true);
            const token = await getTokenSilently();
            crmApi.updateFieldsWithToken(field, data._id, { [name]: formState[name] }, token)
                .then(async (status) => {
                    if (status) {
                        await getData();
                        setRequestStatus(false);
                    }
                })
        }
    }

    const updateAdditionalNote = useCallback(async () => {
        if (!_.isEqual(data.additionalnote, formState.additionalnote)) {
            setRequestStatus(true);
            const token = await getTokenSilently();

            crmApi.updateFieldsWithToken(field, data._id, { additionalnote: formState.additionalnote }, token)
                .then(async (status) => {
                    if (status) {
                        await getData();
                        setRequestStatus(false);
                    }
                })
        }
    }, [data._id, data.additionalnote, field, formState.additionalnote, getData, getTokenSilently])

    useEffect(() => {
        setFormState(data);
    }, [data]);

    useEffect(() => {
        updateAdditionalNote();
    }, [updateAdditionalNote])

    const handleFieldChange = (event) => {
        event.persist();
        setFormState(currentFormState => ({
            ...currentFormState,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangeDate = (value, name) => {
        setFormState(currentFormState => ({
            ...currentFormState,
            [name]: value
        }))
    }

    const handleTagChange = (event) => {
        event.persist && event.persist();
        setTag(event.target.value)
    }

    const handleTagAdd = () => {
        setFormState(currentFormState => {
            return !currentFormState.additionalnote.includes(tag) ? {
                ...currentFormState,
                additionalnote: [...currentFormState.additionalnote, tag]
            } : currentFormState
        })

        setTag('');
    }

    const handleTagDelete = (tag) => {
        setFormState(currentFormState => ({
            ...currentFormState,
            additionalnote: currentFormState.additionalnote.filter(t => t !== tag)
        }))
    }

    const handleLookUpFieldChange = (event, data, name) => {
        const mainFieldName = setMainField(name);
        event.persist();

        setFormState(currentFormState => {
            if (name === 'ownerid' || name === 'managerid') {
                return {
                    ...currentFormState,
                    [name]: typeof data === 'object' && data !== null ? {
                        _id: data._id,
                        firstname: data['firstname'],
                        lastname: data['lastname']
                    } : ''
                }
            }

            return {
                ...currentFormState,
                [name]: typeof data === 'object' && data !== null ? {
                    _id: data._id,
                    [mainFieldName]: data[mainFieldName]
                } : ''
            }
        })
    }

    const [options] = formModel.filter(obj => {
        return obj.groupName.toLowerCase().split(' ').join('') === field;
    });

    return (
        <div>
            {requestStatus ? <LinearProgress /> : <div style={{ height: '4px' }}></div>}
            {isTabletOrMobile ? (
                <ExpansionPanel
                    TransitionProps={{ unmountOnExit: true }}
                    classes={{
                        root: classes.expansionPanelRoot,
                        rounded: classes.expansionPanelRounded
                    }}
                >
                    <ExpansionPanelSummary
                        classes={{
                            root: classes.summaryRoot,
                            content: classes.summaryContent,
                            expandIcon: classes.dropdownIcon
                        }}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography
                            className={classes.cardTitle}
                        >
                            {title}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        className={classes.expansionPanelDetail}
                    >
                        {Object.keys(_objectWithoutProperties(data, ['_id', 'id'])).map(innerField => {

                            const [fieldOptions] = options.fieldsGroup[0].fields.filter(obj => {
                                return obj.name === innerField
                            });

                            return (
                                <div
                                    key={innerField}
                                    className={classes.formWrapper}
                                >
                                    <StyledFormControl>
                                        <div className={classes.labelWrapper}>
                                            <label
                                                style={{
                                                    fontSize: '11px',
                                                    color: '#4C4C51',
                                                    textTransform: 'uppercase',
                                                }}
                                                htmlFor={`id-${innerField}`}
                                            >
                                                {fieldOptions.label}
                                            </label>
                                        </div>
                                        {fieldOptions.type === 'text' ? (
                                            <TextField
                                                disabled={!fieldOptions.editable || requestStatus}
                                                name={innerField}
                                                value={formState[innerField] !== null ? formState[innerField] : ''}
                                                changeHandler={handleFieldChange}
                                                updateHandler={(event) => updateFields(event, innerField)}
                                            />
                                        ) : fieldOptions.type === 'date' ? (
                                            <DatePicker
                                                disabled={!fieldOptions.editable || requestStatus}
                                                name={innerField}
                                                views={innerField === 'birthday' ? ["year", "month", "date"] : ['date']}
                                                value={new Date(formState[innerField])}
                                                changeHanlder={(val) => handleChangeDate(val, innerField)}
                                                updateHandler={(event) => updateFields(event, innerField)}
                                            />
                                        ) : fieldOptions.type === 'optionSet' ? (
                                            <OptionSet
                                                disabled={!fieldOptions.editable || requestStatus}
                                                name={innerField}
                                                multiple={fieldOptions.multiple}
                                                value={formState[innerField]}
                                                changeHandler={handleFieldChange}
                                                updateHanlder={(event) => updateFields(event, innerField)}
                                                optionSets={formProps.optionSets[field][innerField]}
                                            />
                                        ) : fieldOptions.type === 'multiline' ? (
                                            <Multiline
                                                disabled={!fieldOptions.editable || requestStatus}
                                                name={innerField}
                                                tag={tag}
                                                tags={formState.additionalnote}
                                                handleTagAdd={handleTagAdd}
                                                handleTagChange={handleTagChange}
                                                handleTagDelete={handleTagDelete}
                                            />
                                        ) : fieldOptions.type === 'lookUp' ? (
                                            <LookUp
                                                disabled={!fieldOptions.editable || requestStatus}
                                                name={innerField}
                                                value={formState[innerField]}
                                                changeHandler={(event, data) => handleLookUpFieldChange(event, data, innerField)}
                                                updateHandler={(event) => updateFields(event, innerField)}
                                            />
                                        ) : null}
                                    </StyledFormControl>
                                </div>
                            )
                        })}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ) : (
                    <StyledCard
                        className={classes.root}
                    >
                        <StyledCardHeader
                            title={title.toUpperCase()}
                        />
                        <StyledCardContent>
                            {Object.keys(_objectWithoutProperties(data, ['_id', 'id'])).map(innerField => {

                                const [fieldOptions] = options.fieldsGroup[0].fields.filter(obj => {
                                    return obj.name === innerField
                                });

                                return (
                                    <div
                                        key={innerField}
                                        className={classes.formWrapper}
                                    >
                                        <StyledFormControl>
                                            <div className={classes.labelWrapper}>
                                                <label
                                                    style={{
                                                        fontSize: '11px',
                                                        color: '#4C4C51',
                                                        textTransform: 'uppercase',
                                                    }}
                                                    htmlFor={`id-${innerField}`}
                                                >
                                                    {fieldOptions.label}
                                                </label>
                                            </div>
                                            {fieldOptions.type === 'text' ? (
                                                <TextField
                                                    disabled={!fieldOptions.editable || requestStatus}
                                                    name={innerField}
                                                    value={formState[innerField] !== null ? formState[innerField] : ''}
                                                    changeHandler={handleFieldChange}
                                                    updateHandler={(event) => updateFields(event, innerField)}
                                                />
                                            ) : fieldOptions.type === 'date' ? (
                                                <DatePicker
                                                    disabled={!fieldOptions.editable || requestStatus}
                                                    name={innerField}
                                                    views={innerField === 'birthday' ? ["year", "month", "date"] : ['date']}
                                                    value={new Date(formState[innerField])}
                                                    changeHanlder={(val) => handleChangeDate(val, innerField)}
                                                    updateHandler={(event) => updateFields(event, innerField)}
                                                />
                                            ) : fieldOptions.type === 'optionSet' ? (
                                                <OptionSet
                                                    disabled={!fieldOptions.editable || requestStatus}
                                                    name={innerField}
                                                    multiple={fieldOptions.multiple}
                                                    value={formState[innerField]}
                                                    changeHandler={handleFieldChange}
                                                    updateHanlder={(event) => updateFields(event, innerField)}
                                                    optionSets={formProps.optionSets[field][innerField]}
                                                />
                                            ) : fieldOptions.type === 'multiline' ? (
                                                <Multiline
                                                    disabled={!fieldOptions.editable || requestStatus}
                                                    name={innerField}
                                                    tag={tag}
                                                    tags={formState.additionalnote}
                                                    handleTagAdd={handleTagAdd}
                                                    handleTagChange={handleTagChange}
                                                    handleTagDelete={handleTagDelete}
                                                />
                                            ) : fieldOptions.type === 'lookUp' ? (
                                                <LookUp
                                                    disabled={!fieldOptions.editable || requestStatus}
                                                    name={innerField}
                                                    value={formState[innerField]}
                                                    changeHandler={(event, data) => handleLookUpFieldChange(event, data, innerField)}
                                                    updateHandler={(event) => updateFields(event, innerField)}
                                                />
                                            ) : null}
                                        </StyledFormControl>
                                    </div>
                                )
                            })}
                        </StyledCardContent>
                    </StyledCard>
                )}
        </div>
    )
}

CardApp.propTypes = {
    data: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    mainid: PropTypes.string,
    getData: PropTypes.func.isRequired
}

export default CardApp;