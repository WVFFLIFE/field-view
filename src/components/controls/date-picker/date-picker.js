import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = ({ name, value, changeHanlder, updateHandler, disabled, views }) => {

    return (
        <KeyboardDatePicker
            disabled={disabled}
            disableToolbar={true}
            openTo={views[0]}
            variant="inline"
            format="yyyy.MM.dd"
            views={views}
            id={`id-${name}`}
            inputProps={{
                style: {
                    fontFamily: 'SegoeUIRegular',
                    fontSize: '13px',
                    color: '#4C4C51'
                }
            }}
            name={name}
            value={value}
            onChange={changeHanlder}
            onClose={updateHandler ? updateHandler : null}
        />
    )
}

DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    changeHanlder: PropTypes.func.isRequired,
    updateHandler: PropTypes.func
}

export default DatePicker;