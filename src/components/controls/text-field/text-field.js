import React from 'react';
import { Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const StyledInput = withStyles({
    root: {
        flexGrow: 2,
        marginRight: '0',
        padding: '3px 12px',
        fontSize: '13px',
        fontFamily: 'SegoeUIRegular',
        border: '1px solid #D9D9D9',
        borderRadius: '4px',
        color: '#4C4C51'
    }
})(Input);

const TextField = ({name, value, changeHandler, updateHandler, disabled, type}) => {
    return (
        <StyledInput
            disabled={disabled}
            type={type}
            id={`id-${name}`}
            name={name}
            value={value === null || value === undefined ? '' : value}
            disableUnderline={true}
            margin="none"
            onChange={changeHandler}
            onBlur={updateHandler ? updateHandler : null} />
    )
}

TextField.defaultProps = {
    name: '',
    changeHandler: () => {},
    disabled: false,
    type: 'text'
}

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    changeHandler: PropTypes.func.isRequired,
    updateHandler: PropTypes.func,
    disabled: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['text', 'number'])
}

export default TextField;