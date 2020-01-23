import {
    CardContent,
    Card,
    CardHeader,
    CardActions,
    FormControl,
    Input,
    Select
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledCard = withStyles({
    root: {
        padding: '25px 20px',
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 0,
        boxShadow: 'none'
    }
})(Card);

const StyledCardHeader = withStyles(theme => ({
    root: {
        marginBottom: '15px',
        padding: 0,
        [theme.breakpoints.down('md')]: {
            marginBottom: 0
        }
    },
    title: {
        fontSize: '16px',
        fontFamily: 'SegoeUIRegular'
    }
}))(CardHeader);

const StyledCardAction = withStyles({
    root: {
        paddingLeft: 0
    }
})(CardActions);

const StyledCardContent = withStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 0,
        paddingTop: '20px',
        borderTop: '2px solid #2d7ff9',
        '&:last-child': {
            paddingBottom: 0
        }
    }
})(CardContent);

const StyledFormControl = withStyles({
    root: {
        width: '100%'
    }
})(FormControl);

const StyledInput = withStyles({
    root: {
        flexGrow: 2,
        marginTop: '16px',
        marginRight: '5px',
        padding: '3px 12px',
        fontSize: '13px',
        fontFamily: 'SegoeUIRegular',
        border: '1px solid #D9D9D9',
        borderRadius: '4px',
        color: '#4C4C51'
    }
})(Input);

const StyledSelect = withStyles({
    root: {
        paddingLeft: '12px',
        paddingRight: '12px',
        fontSize: '13px',
        fontFamily: 'SegoeUIRegular',
        color: '#4C4C51'
    }
})(Select);

export {
    StyledCard,
    StyledCardHeader,
    StyledCardAction,
    StyledCardContent,
    StyledFormControl,
    StyledInput,
    StyledSelect
}