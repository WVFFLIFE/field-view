import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    FormControl,
    Input,
    Select,
} from '@material-ui/core';
import {KeyboardDatePicker} from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';

const StyledCard = withStyles({
    root: {
        marginBottom: '15px',
        padding: '25px 20px',
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 0,
        boxShadow: 'none'
    }
})(Card);

const StyledCardHeader = withStyles({
    root: {
        marginBottom: '15px',
        padding: 0,
    },
    title: {
        fontSize: '16px',
        fontFamily: 'SegoeUIRegular',
        textTransform: 'capitalize'
    }
})(CardHeader);

const StyledCardAction = withStyles({
    root: {
        paddingLeft: '12px'
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
        marginTop: '16px',
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

const StyledKeyboardDatePicker = withStyles({
    root: {
        marginTop: '16px'
    }
})(KeyboardDatePicker);

export {
    StyledCard,
    StyledCardHeader,
    StyledCardContent,
    StyledCardAction,
    StyledInput,
    StyledSelect,
    StyledFormControl,
    StyledKeyboardDatePicker
}