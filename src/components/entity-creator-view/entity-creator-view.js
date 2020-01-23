import React from 'react';
import {
    StyledCard,
    StyledCardHeader,
    StyledCardContent,
    StyledFormControl,
} from './styled-components';
import {
    Divider,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { formModel, formProps } from '../../data-model/form';
import { transformToCardTitle } from '../../data-model/data-converter';
import { useMediaQuery } from 'react-responsive';
import {
    DatePicker,
    LookUp,
    Multiline,
    OptionSet,
    TextField
} from '../controls';

const useStyles = makeStyles(theme => ({
    dropdownIcon: {
        marginRight: 0,
        padding: 2,
        background: '#F2F2F2',
        borderRadius: 3,
    },
    expansionPanelRoot: {
        marginBottom: 20,
        padding: '0 20px',
        border: '1px solid #e8e8e8',
        borderRadius: 0,
        '&.Mui-expanded': {
            margin: 0,
            marginBottom: 20,
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
    },
    inputWrapper: {
        boxSizing: 'border-box',
        width: '50%',
        padding: '12px',
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
    label: {
        fontSize: '11px',
        color: '#A3A3A3',
        textTransform: 'uppercase',
    }
}))

const EntityCreatorView = props => {
    const classes = useStyles();
    const { field, data, handleFieldChange, handleChangeDate, handleLookUpFieldChange, handleTagChange, handleTagAdd, handleTagDelete, tag, parent } = props;
    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 1280px)'
    })
    const [options] = formModel.filter(obj => {
        return obj.groupName.toLowerCase().split(' ').join('') === field.split('-').join('');
    });
    const title = transformToCardTitle(field);

    return (
        <>
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
                        {Object.keys(data).map(innerField => {
                            const [fieldOptions] = options.fieldsGroup[0].fields.filter(obj => {
                                return obj.name === innerField
                            });

                            if (!fieldOptions.editable) {
                                return null;
                            }

                            return (
                                <div
                                    key={innerField}
                                    className={classes.inputWrapper}
                                >
                                    <StyledFormControl>
                                        <div className={classes.labelWrapper}>
                                            <label
                                                className={classes.label}
                                                htmlFor={`id-${innerField}`}
                                            >
                                                {fieldOptions.label}
                                            </label>
                                        </div>
                                        {fieldOptions.type === 'text' ? (
                                            <TextField
                                                name={innerField}
                                                value={data[innerField] !== null ? data[innerField] : ''}
                                                changeHandler={(event) => handleFieldChange(event, parent)}
                                            />
                                        ) : fieldOptions.type === 'date' ? (
                                            <DatePicker
                                                name={innerField}
                                                views={innerField === 'birthday' ? ["year", "month", "date"] : ['date']}
                                                value={new Date(data[innerField])}
                                                changeHanlder={(val) => handleChangeDate(val, innerField, parent)}
                                            />
                                        ) : fieldOptions.type === 'optionSet' ? (
                                            <OptionSet
                                                name={innerField}
                                                multiple={fieldOptions.multiple}
                                                value={data[innerField]}
                                                changeHandler={(event) => handleFieldChange(event, parent)}
                                                optionSets={formProps.optionSets[field][innerField]}
                                            />
                                        ) : fieldOptions.type === 'lookUp' ? (
                                            <LookUp
                                                name={innerField}
                                                value={data[innerField]}
                                                changeHandler={(event, data) => handleLookUpFieldChange(event, data, innerField, parent)}
                                            />
                                        ) : fieldOptions.type === 'multiline' ? (
                                            <Multiline
                                                name={innerField}
                                                value={data[innerField]}
                                                tag={tag}
                                                tags={data.additionalnote}
                                                handleTagAdd={handleTagAdd}
                                                handleTagChange={handleTagChange}
                                                handleTagDelete={handleTagDelete}
                                            />
                                        ) : null}
                                    </StyledFormControl>
                                </div>

                            )
                        })}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ) : (
                    <StyledCard>
                        <StyledCardHeader title={`Create New ${title}`} />
                        <Divider />
                        <StyledCardContent>
                            {Object.keys(data).map(innerField => {
                                const [fieldOptions] = options.fieldsGroup[0].fields.filter(obj => {
                                    return obj.name === innerField
                                });

                                if (!fieldOptions.editable) {
                                    return null;
                                }

                                return (
                                    <div
                                        key={innerField}
                                        style={{
                                            boxSizing: 'border-box',
                                            width: '50%',
                                            padding: '12px'
                                        }}
                                    >
                                        <StyledFormControl>
                                            <div style={{
                                                marginBottom: '16px'
                                            }}>
                                                <label
                                                    style={{
                                                        fontSize: '11px',
                                                        color: '#A3A3A3',
                                                        textTransform: 'uppercase',
                                                    }}
                                                    htmlFor={`id-${innerField}`}
                                                >
                                                    {fieldOptions.label}
                                                </label>
                                            </div>
                                            {fieldOptions.type === 'text' ? (
                                                <TextField
                                                    name={innerField}
                                                    value={data[innerField] !== null ? data[innerField] : ''}
                                                    changeHandler={(event) => handleFieldChange(event, parent)}
                                                />
                                            ) : fieldOptions.type === 'date' ? (
                                                <DatePicker
                                                    name={innerField}
                                                    views={innerField === 'birthday' ? ["year", "month", "date"] : ['date']}
                                                    value={new Date(data[innerField])}
                                                    changeHanlder={(val) => handleChangeDate(val, innerField, parent)}
                                                />
                                            ) : fieldOptions.type === 'optionSet' ? (
                                                <OptionSet
                                                    name={innerField}
                                                    multiple={fieldOptions.multiple}
                                                    value={data[innerField]}
                                                    changeHandler={(event) => handleFieldChange(event, parent)}
                                                    optionSets={formProps.optionSets[field][innerField]}
                                                />
                                            ) : fieldOptions.type === 'lookUp' ? (
                                                <LookUp
                                                    name={innerField}
                                                    value={data[innerField]}
                                                    changeHandler={(event, data) => handleLookUpFieldChange(event, data, innerField, parent)}
                                                />
                                            ) : fieldOptions.type === 'multiline' ? (
                                                <Multiline
                                                    name={innerField}
                                                    value={data[innerField]}
                                                    tag={tag}
                                                    tags={data.additionalnote}
                                                    handleTagAdd={handleTagAdd}
                                                    handleTagChange={handleTagChange}
                                                    handleTagDelete={handleTagDelete}
                                                />
                                            ) : null}
                                        </StyledFormControl>
                                    </div>

                                )
                            })}
                        </StyledCardContent>
                    </StyledCard>
                )}
        </>

    )
}

export default EntityCreatorView;