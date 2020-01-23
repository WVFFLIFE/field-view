import React, { useState, useRef } from 'react';
import { Grid, IconButton, Toolbar, Menu, Hidden } from '@material-ui/core';
import clsx from 'clsx';
import { ArrowDropDown, InfoOutlined, AddCircleOutline } from '@material-ui/icons';
import Breadcrumbs from '../breadcrumbs';
import {
    StyledDivider,
    StyledGrid,
    StyledAppBar,
    BrandName,
    StyledIconButton,
    StyledBadge,
    AdditionalLink,
    MobileDivider,
    MobileMenuItem
} from './styled-components';
import UserMenu from '../user-menu';
import { MenuIcon, GroupAdd, Message, Notifications } from '../icons';
import { Link as RouterLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'right'
    },
    itemText: {
        margin: 0,
        padding: 0,
        fontSize: 14,
        fontFamily: 'SegoeUISemiBold',
        color: '#fff'
    },
    mobileMenu: {
        minWidth: 148,
        paddingTop: 0,
        paddingBottom: 0,
        background: '#0050B3',
    },
    mobileMenuIcons: {
        padding: 7,
        color: '#fff'
    },
    notification: {
        marginRight: 5,
    },
    extendedMobileMenuIcons: {
        width: '100%'
    },
    mobileMenuIconsInfo: {
        justifyContent: 'space-between'
    },
    mobileBadge: {
        height: 15,
        minWidth: 15,
        padding: '0 4px',
        fontSize: '0.7rem'
    },
    dropdown: {
        padding: 6,
        transition: '.25s ease-in-out'
    },
    dropdownActive: {
        transform: 'rotate(180deg)',
        transition: '.25s ease-in-out'
    },
    menuPaper: {
        borderRadius: 0,
        right: '0 !important'
    }
}))

const LinkRouter = props => <AdditionalLink {...props} component={RouterLink} />

const MobileMenu = ({ mobileMoreAnchorEl, isMobileMenuOpen, handleMobileMenuClose, classes }) => (
    <Menu
        classes={{
            paper: classes.menuPaper
        }}
        getContentAnchorEl={null}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        MenuListProps={{
            classes: {
                padding: classes.mobileMenu
            }
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
    >
        <MobileMenuItem>
            <IconButton 
                className={classes.mobileMenuIcons}
            >
                <AddCircleOutline />
            </IconButton>
            <p
                className={classes.itemText}
            >
                Create
            </p>
        </MobileMenuItem>
        <MobileDivider />
        <MobileMenuItem>
            <IconButton 
                className={classes.mobileMenuIcons}
            >
               <GroupAdd htmlColor="#fff" viewBox="0 0 20 20" />
            </IconButton>
            <p
                className={classes.itemText}
            >
                Add Account
            </p>
        </MobileMenuItem>
        <MobileDivider />
        <MobileMenuItem>
            <IconButton 
                className={classes.mobileMenuIcons}
            >
                <Message htmlColor="#fff" viewBox="0 0 22 22" />
            </IconButton>
            <p
                className={classes.itemText}
            >
                Messages
            </p>
        </MobileMenuItem>
        <MobileDivider />
        <MobileMenuItem>
            <IconButton 
                color="inherit" 
                className={clsx(classes.mobileMenuIcons, classes.notification)}
            >
                <StyledBadge 
                    badgeContent={8} 
                    color="primary"
                    classes={{
                        badge: classes.mobileBadge
                    }}
                >
                    <Notifications viewBox="0 0 16 22" htmlColor="#fff" />
                </StyledBadge>
            </IconButton>
            <p
                className={classes.itemText}
            >
                Notifications
            </p>
        </MobileMenuItem>
        <MobileDivider />
        <MobileMenuItem>
            <IconButton
                color="inherit"
                classes={{
                    label: classes.mobileMenuIconsInfo
                }}
                className={clsx(classes.mobileMenuIcons, classes.extendedMobileMenuIcons)}
            >
                <InfoOutlined />
                <ArrowDropDown />
            </IconButton>
        </MobileMenuItem>
    </Menu>
);

const DesktopMenu = () => (
    <Toolbar style={{justifyContent: 'flex-end'}}>
        <StyledDivider orientation="vertical" />
        <LinkRouter to="/">
            Home
        </LinkRouter>
        <StyledDivider orientation="vertical" />
        <LinkRouter to="/">
            Create
        </LinkRouter>
        <StyledDivider orientation="vertical" />
        <div style={{ padding: '0 10px' }}>
            <IconButton>
                <GroupAdd htmlColor="#002766" viewBox="0 0 20 20" />
            </IconButton>
            <IconButton>
                <Message htmlColor="#002766" viewBox="0 0 22 22" />
            </IconButton>
            <IconButton color="inherit">
                <StyledBadge badgeContent={8} color="primary">
                    <Notifications viewBox="0 0 16 22" htmlColor="#fff" />
                </StyledBadge>
            </IconButton>
        </div>
        <StyledDivider orientation="vertical" />
        <IconButton>
            <InfoOutlined />
            <ArrowDropDown />
        </IconButton>
        <Toolbar>
            <UserMenu />
        </Toolbar>
    </Toolbar>
)

const TopBar = ({ toggleMenuShown }) => {
    const classes = useStyles();
        const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const isTabletOrMobileDevice = useMediaQuery({
            query: '(max-width: 1280px)'
        });

    const headerRef = useRef(null);

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(headerRef.current);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    return (
        <StyledAppBar
            ref={headerRef}
            position={isTabletOrMobileDevice ? "fixed" : "static"}
        >
            <StyledGrid container>
                <Grid
                    item
                    lg={2}
                    xs={6}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        minHeight: '65px',
                        paddingLeft: 16,
                        paddingRight: 16
                    }}>
                        <StyledIconButton
                            onClick={toggleMenuShown}
                            edge="start"
                            color="inherit">
                            <MenuIcon
                                htmlColor="#fff"
                                viewBox="0 0 12 13" />
                        </StyledIconButton>
                        <BrandName
                            variant="h6"
                            noWrap>
                            FieldView
                        </BrandName>
                    </div>
                </Grid>
                <Hidden
                    mdDown
                >
                    <Grid
                        item
                        lg={4}
                        sm={8}
                    >
                        <Breadcrumbs />
                    </Grid>
                </Hidden>
                <Grid
                    item
                    lg={6}
                    xs={6}
                    classes={{
                        root: classes.root
                    }}
                >
                    {isTabletOrMobileDevice ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                            <UserMenu />
                            <IconButton
                                aria-label="show more"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                className={clsx(classes.dropdown, {
                                    [classes.dropdownActive]: isMobileMenuOpen
                                })}
                                color="inherit"
                            >
                                <ArrowDropDown />
                            </IconButton>
                        </div>
                    ) : <DesktopMenu />}
                    <MobileMenu 
                        classes={classes}
                        isMobileMenuOpen={isMobileMenuOpen}
                        mobileMoreAnchorEl={mobileMoreAnchorEl}
                        handleMobileMenuClose={handleMobileMenuClose}
                    />
                </Grid>
            </StyledGrid>
        </StyledAppBar>
    )
}

export default TopBar;