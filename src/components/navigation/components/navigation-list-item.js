import React, {forwardRef} from 'react'
import { NavLink as RouterLink } from 'react-router-dom';
import { ListItem, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const CustomRouterLink = forwardRef((props, ref) => (
    <div
        ref={ref}
        style={{ flexGrow: 1, width: '100%' }}
    >
        <RouterLink  {...props}/>
    </div>
))

const useStyles = makeStyles(theme => ({
    item: {
        display: 'block',
        paddingTop: 0,
        paddingBottom: 0,
    },
    itemLeaf: {
        display: 'flex',
        padding: 0
    },
    button: {
        position: 'relative',
        width: '100%',
        padding: '10px 8px',
        justifyContent: 'flex-start',
        border: '1px solid transparent',
        borderRadius: '2px',
        textTransform: 'capitalize',
        letterSpacing: 0,
        [theme.breakpoints.down('md')]: {
            minWidth: '100%'
        },
    },
    icon: {
        marginRight: '8px'
    },
    label: {
        fontSize: '14px',
        fontFamily: 'SegoeUIRegular',
        color: '#4c4c51',
    },
    active: {
        border: '1px solid rgba(0, 80, 179, 0.52)',
        borderRadius: '2px',
        '&::before': {
            content: "''",
            position: 'absolute',
            left: 0,
            top: 0,
            width: '3px',
            height: '100%',
            background: '#0050B3',
            borderRadius: '4px'
        }
    }
}))

const NavigationListItem = props => {

    const {title, href, icon: Icon} = props;
    const classes = useStyles();

    return (
        <ListItem className={clsx(classes.itemLeaf)}>
            <Button
                activeClassName={classes.active}
                component={CustomRouterLink}
                className={classes.button}
                exact
                to={href}
            >
                {Icon && <Icon className={classes.icon}/>}
                <span className={classes.label}>
                    {title}
                </span>
            </Button>
        </ListItem>
    )
}

export default NavigationListItem;