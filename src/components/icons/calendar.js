import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
    root: {
        width: 12,
        height: 13,
        marginRight: 5
    }
})(SvgIcon);

const CalendarIcon = (props) => {
    return (
        <StyledSvgIcon {...props} viewBox="0 0 12 13">
            <path d="M8.91602 1.75H11.2493C11.4041 1.75 11.5524 1.81146 11.6618 1.92085C11.7712 2.03025 11.8327 2.17862 11.8327 2.33333V11.6667C11.8327 11.8214 11.7712 11.9698 11.6618 12.0791C11.5524 12.1885 11.4041 12.25 11.2493 12.25H0.749349C0.594639 12.25 0.446266 12.1885 0.33687 12.0791C0.227474 11.9698 0.166016 11.8214 0.166016 11.6667V2.33333C0.166016 2.17862 0.227474 2.03025 0.33687 1.92085C0.446266 1.81146 0.594639 1.75 0.749349 1.75H3.08268V0.583333H4.24935V1.75H7.74935V0.583333H8.91602V1.75ZM7.74935 2.91667H4.24935V4.08333H3.08268V2.91667H1.33268V5.25H10.666V2.91667H8.91602V4.08333H7.74935V2.91667ZM10.666 6.41667H1.33268V11.0833H10.666V6.41667Z" />
        </StyledSvgIcon>
    )
}

export default CalendarIcon;