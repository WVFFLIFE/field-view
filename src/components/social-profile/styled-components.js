import {
    CardContent,
    Card,
    CardHeader,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledCard = withStyles(theme => ({
    root: {
        padding: 20,
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 0,
        boxShadow: 'none',
        [theme.breakpoints.down('md')]: {
            paddingBottom: 20
        }
    }
}))(Card);

const StyledCardHeader = withStyles(theme => ({
    root: {
        position: 'relative',
        padding: 0,
        paddingBottom: 15,
        textTransform: 'uppercase',
        '&::before': {
            content: "''",
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 2,
            background: '#2d7ff9'
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '16px',
        fontFamily: 'SegoeUIRegular'
    }
}))(CardHeader);


const StyledCardContent = withStyles({
    root: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0
        }
    }
})(CardContent);

export {
    StyledCard,
    StyledCardHeader,
    StyledCardContent,
}