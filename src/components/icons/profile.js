import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledSvgIcon = withStyles({
    root: {
        width: '32',
        height: '32px'
    }
})(SvgIcon);

const Profile = props => {
    return (
        <StyledSvgIcon {...props}>
            
        </StyledSvgIcon>
    )
}

export default Profile;