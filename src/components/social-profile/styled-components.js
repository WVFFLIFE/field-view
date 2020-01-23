import {
    CardContent,
    Card,
    CardHeader,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledCard = withStyles({
    root: {
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 0,
        boxShadow: 'none'
    }
})(Card);

const StyledCardHeader = withStyles(theme => ({
    root: {
        position: 'relative',
        marginBottom: '15px',
        padding: 20,
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
            marginBottom: 0
        },
        '&::before': {
            content: "''",
            position: 'absolute',
            bottom: 0,
            width: 'calc(100% - 40px)',
            height: 3,
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