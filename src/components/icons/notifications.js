import React from 'react';
import {SvgIcon} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
    root: {
        width: '16px',
        height: '22px'
    }
})(SvgIcon);

const Notifications = props => {
    return (
        <StyledSvgIcon {...props}>
            <path d="M15.125 17H14.5625V9.03125C14.5625 5.72422 12.118 2.99141 8.9375 2.53672V1.625C8.9375 1.10703 8.51797 0.6875 8 0.6875C7.48203 0.6875 7.0625 1.10703 7.0625 1.625V2.53672C3.88203 2.99141 1.4375 5.72422 1.4375 9.03125V17H0.875C0.460156 17 0.125 17.3352 0.125 17.75V18.5C0.125 18.6031 0.209375 18.6875 0.3125 18.6875H5.375C5.375 20.1359 6.55156 21.3125 8 21.3125C9.44844 21.3125 10.625 20.1359 10.625 18.6875H15.6875C15.7906 18.6875 15.875 18.6031 15.875 18.5V17.75C15.875 17.3352 15.5398 17 15.125 17ZM8 19.8125C7.37891 19.8125 6.875 19.3086 6.875 18.6875H9.125C9.125 19.3086 8.62109 19.8125 8 19.8125ZM3.125 17V9.03125C3.125 7.72813 3.63125 6.50469 4.55234 5.58359C5.47344 4.6625 6.69688 4.15625 8 4.15625C9.30313 4.15625 10.5266 4.6625 11.4477 5.58359C12.3687 6.50469 12.875 7.72813 12.875 9.03125V17H3.125Z"/>
        </StyledSvgIcon>
    )
}

export default Notifications;