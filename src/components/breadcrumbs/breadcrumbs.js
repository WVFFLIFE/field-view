import React from 'react';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { withRouter } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { capitalizeFirstLetter } from '../../utils';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';

const StyledBreadcrumbs = withStyles(theme => ({
    root: {
        color: '#fff',
        padding: '12px',
        paddingLeft: '24px',
        [theme.breakpoints.down('md')]: {
            padding: '12px 0 0 0',
            color: '#4C4C51'
        }
    },
    li: {
        padding: 0,
        borderBottom: 'none'
    },
    separator: {
        marginLeft: '10px',
        marginRight: '10px',
        padding: 0,
        borderBottom: 'none',
    }
}))(MuiBreadcrumbs);

const BreadCrumbsLink = withStyles(theme => ({
    root: {
        fontSize: '14px',
        fontFamily: 'SegoeUIRegular',
        color: '#fff',
        textDecoration: 'underline',
        lineHeight: 1,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
            color: '#4C4C51'
        }
    }
}))(Link);

const StyledTypography = withStyles(theme => ({
    root: {
        fontSize: '14px',
        fontFamily: 'SegoeUIRegular',
        color: '#fff',
        lineHeight: 1,
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
            color: '#4C4C51'
        }
    }
}))(Typography);

const LinkRouter = props => <BreadCrumbsLink {...props} component={RouterLink}/>

const Breadcrumbs = ({location}) => {

    const urlArr = location.pathname.split('/').filter(path => path !== '');

    return (
        <StyledBreadcrumbs aria-label="breadrcumb">
            {
                urlArr.length === 0 ? (
                    <StyledTypography>Home</StyledTypography>
                ) : (
                    <LinkRouter to="/">Home</LinkRouter>
                )
            }
            {
                urlArr.filter(url => url !== '').map((value, index, array) => {
                    const label = value.includes('-') ? value.split('-').map(str => capitalizeFirstLetter(str)).join(' ') : capitalizeFirstLetter(array[index]);
                    const to = label === 'Create Entity' ? `/${array[array.length - 1]}` : `/${urlArr.slice(0, index + 1).join('/')}`;
                    const last = index === urlArr.length - 1;

                    return last ? (
                        <StyledTypography key={value}>
                            {label}
                        </StyledTypography>
                    ) : (
                        <LinkRouter key={to} to={to}>
                            {label}
                        </LinkRouter>
                    )
                })
            }
        </StyledBreadcrumbs>
    )
}

export default withRouter(Breadcrumbs);