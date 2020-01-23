import { styled, withStyles } from '@material-ui/core/styles';
import {
    Link,
    Typography,
    Divider,
    Grid,
    AppBar,
    IconButton,
    Badge,
    MenuItem
} from '@material-ui/core';

const StyledLink = styled(Link)({
    padding: '7px 15px',
    fontSize: '14px',
    color: '#fff'
});

const StyledTypography = withStyles({
    h6: {
        fontSize: '14px',
        fontFamily: 'SegoeUIRegular',
        lineHeight: '22px'
    }
})(Typography);

const StyledIconButton = withStyles({
    root: {
        marginRight: '3px'
    }
})(IconButton);

const BrandName = withStyles({
    h6: {
        fontFamily: 'SegoeUIRegular',
        fontSize: '18px',
        lineHeight: '28px'
    }
})(Typography);

const StyledDivider = withStyles({
    root: {
        height: '20px',
        backgroundColor: '#003A8C'
    }
})(Divider)

const StyledGrid = withStyles({
    root: {
        alignItems: 'center'
    }
})(Grid);

const StyledAppBar = withStyles({
    root : {
        background: 'linear-gradient(0deg, #0050B3, #0050B3), #0050B3'
    }
})(AppBar);

const StyledBadge = withStyles({
    badge: {
        border: '1px solid #fff'
    },
    colorPrimary: {
        background: '#F5222D'
    }
})(Badge);

const AdditionalLink = withStyles({
    root: {
        padding: '7px 15px',
        fontSize: '14px',
        fontFamily: 'SegoeUIRegular',
        color: '#fff',
        textDecoration: 'none'
    }
})(Link);

const MobileDivider = withStyles({
    root: {
        height: '1px',
        opacity: '0.2',
        backgroundColor: '#E8E8E8'
    }
})(Divider);

const MobileMenuItem = withStyles({
    gutters: {
        paddingRight: 6,
        paddingLeft: 6
    }
})(MenuItem);

export {
    MobileMenuItem,
    StyledLink,
    StyledTypography,
    StyledDivider,
    StyledGrid,
    StyledAppBar,
    BrandName,
    StyledIconButton,
    StyledBadge,
    AdditionalLink,
    MobileDivider
}