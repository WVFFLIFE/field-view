import React from 'react';
import { Select, Chip, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { transformToCardTitle } from '../../../data-model/data-converter';
import PropTypes from 'prop-types'

const StyledSelect = withStyles({
    root: {
        width: '100%',
        paddingLeft: '12px',
        paddingRight: '12px',
        fontSize: '13px',
        fontFamily: 'SegoeUIRegular',
        color: '#4C4C51',
        textTransform: 'capitalize'
    }
})(Select);

const StyledMenuItem = withStyles(theme => ({
    root: {
        fontSize: '13px',
        fontFamily: 'SegoeUIRegular',
        color: '#4C4C51',
        textTransform: 'capitalize',
        [theme.breakpoints.down('md')]: {
            minHeight: 30
        }
    }
}))(MenuItem);

const StyledChip = withStyles({
    root: {
        textTransform: 'capitalize'
    }
})(Chip);

const OptionSet = ({ name, multiple, value, changeHandler, updateHanlder, optionSets, disabled }) => {
    return (
        <StyledSelect
            id={`id-${name}`}
            name={name}
            disabled={disabled}
            multiple={multiple}
            value={value}
            renderValue={multiple ? selected => (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                    {selected.map(selectedValue => (
                        <StyledChip 
                            style={{ 
                                marginBottom: '3px', 
                                marginRight: '3px' 
                            }} 
                            key={selectedValue} 
                            label={transformToCardTitle(selectedValue)} 
                        />
                    ))}
                </div>
            ) : null}
            onChange={changeHandler}
            onBlur={updateHanlder ? updateHanlder : null}
        >
            {optionSets.map(({ id, value: pickerValue }) => {
                const text = transformToCardTitle(pickerValue);
                return (
                    <StyledMenuItem 
                        key={id} 
                        value={pickerValue}
                    >
                        {text}
                    </StyledMenuItem>
                )
            })}
        </StyledSelect>
    )
}

OptionSet.propTypes = {
    name: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    changeHandler: PropTypes.func.isRequired,
    updateHanlder: PropTypes.func,
    optionSets: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string
    })).isRequired
}

export default OptionSet;