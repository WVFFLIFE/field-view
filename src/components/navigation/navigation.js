import React from 'react';
import {List, Typography} from '@material-ui/core';
import NavigationListItem from './components/navigation-list-item';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {
        paddingTop: 0,
        paddingBottom: '20px',
    },
    text: {
        marginLeft: '9px',
        fontSize: '12px',
        fontFamily: 'SegoeUISemiBold',
        lineHeight: '2',
        letterSpacing: 0,
        color: '#262626',
        textTransform: 'capitalize',
    }
}));

const NavigationList = props => {
    const { pages } = props;
    const classes = useStyles();

    return (
        <List className={classes.list}>
            {pages.reduce(
                (items, page) => {
                    items.push(
                        <NavigationListItem 
                            href={page.href}
                            icon={page.icon}
                            key={page.title}
                            label={page.label}
                            title={page.title}
                        />
                    )

                    return items;
                }, []
            )}
        </List>
    )
}

const Navigation = props => {
    const {title, pages, component : Component} = props;
    const classes = useStyles();

    return (
        <Component>
            {title && (
                <Typography 
                    className={classes.text}
                    variant="overline"
                >
                        {title}
                </Typography>
            )}
            <NavigationList 
                pages={pages}
            />
        </Component>
    )
}

export default Navigation;