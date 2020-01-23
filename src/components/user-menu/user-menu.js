import React, { useState } from 'react';
import {AccountCircle} from '@material-ui/icons';
import { 
    IconButton,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../react-auth0-spa';

const StyledTypography = withStyles({
    h6: {
        fontSize: '14px',
        fontFamily: 'SegoeUIRegular',
        lineHeight: '22px',
        textTransform: 'capitalize'
    }
})(Typography);

const UserMenu = () => {
    const [anchorMenu, setAnchorMenu] = useState(null);
    const {logout, user} = useAuth0();

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <IconButton 
                color="inherit"
                onClick={(event) => setAnchorMenu(event.currentTarget)}
            >
                <AccountCircle />
            </IconButton>
            <StyledTypography
                variant="h6"
                noWrap
            >
                {user.nickname}
            </StyledTypography>
            <Menu
                id="menu-appbar"
                anchorEl={anchorMenu}
                open={!!anchorMenu}
                onClose={() => setAnchorMenu(null)}
            >
                <MenuItem>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                    Sign out
                </MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu