import { withStyles } from '@material-ui/core/styles';
import {
    TableSortLabel,
    Checkbox,
    TableCell,
    TableRow,
    IconButton
} from '@material-ui/core';

const StyledSortLabel = withStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}))(TableSortLabel);

const StyledHeaderCheckboxTableCell = withStyles(theme => ({
    root: {
        width: '64px',
        paddingLeft: 0,
        paddingRight: 0,
        fontFamily: 'SegoeUIRegular',
        fontSize: '14px',
        borderRight: '1px solid #e8e8e8',
        background: '#fafafa',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            width: 37,
            padding: 8
        }
    }
}))(TableCell);

const StyledCheckbox = withStyles({
    root: {
        padding: 0,
        width: '16px',
        height: '16px',
        color: '#d9d9d9',
        borderRadius: '2px',
        '&:hover': {
            color: '#1890FF',
            background: '#fff'
        }
    },
    checked: {
        color: '#0050B3',
        '&:hover': {
            color: '#0050B3'
        }
    },
    indeterminate: {
        color: '#777',
        '&:hover': {
            color: '#777'
        }
    }
})(Checkbox);

const StyledHeaderTableCell = withStyles(theme => ({
    root: {
        padding: '16px',
        borderRight: '1px solid #e8e8e8',
        background: '#fafafa',
        fontFamily: 'SegoeUISemiBold',
        fontSize: '14px',
        color: '#4C4C51',
        whiteSpace: 'nowrap',
        minWidth: '130px',
        [theme.breakpoints.down('md')]: {
            padding: 8,
            lineHeight: '1.3rem'
        }
    },
    paddingCheckbox: {
        padding: '10px'
    }
}))(TableCell);

const StyledTableRow = withStyles({
    root: {
        cursor: 'pointer',
        '&.MuiTableRow-hover': {
            '&:hover' : {
                background: '#F0F7FF',
            }
        },
        '&.Mui-selected': {
            background: '#FAFAFA'
        }
    }
})(TableRow);

const StyledCheckboxTableCell = withStyles(theme => ({
    root: {
        minWidth: '64px',
        paddingLeft: 0,
        paddingRight: 0,
        borderRight: '1px solid #e8e8e8',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            boxSizing: 'border-box',
            maxWidth: 37,
            minWidth: 37,
            padding: 10
        }
    }
}))(TableCell);

const StyledMainCheckBox = withStyles({
    root: {
        padding: 0,
        width: '16px',
        height: '16px',
        color: '#1890ff',
        borderRadius: '2px',
        '&:hover': {
            color: '#1890FF',
            background: '#fff'
        }
    },
    checked: {
        color: '#0050B3',
        '&:hover': {
            color: '#0050B3'
        }
    },
    indeterminate: {
        color: '#777',
        '&:hover': {
            color: '#777'
        }
    }
})(Checkbox);

const StyledTableCell = withStyles(theme => ({
    root: {
        padding: '16px',
        fontFamily: 'SegoeUIRegular',
        fontSize: '14px',
        borderRight: '1px solid #e8e8e8',
        [theme.breakpoints.down('md')]: {
            padding: 10
        }
    }
}))(TableCell);

const StyledIconButton = withStyles({
    root: {
        padding: '3px'
    }
})(IconButton);

const StyledHeaderIconTableCell = withStyles(theme => ({
    root: {
        width: '64px',
        padding: '11px 0',
        borderRight: '1px solid #e8e8e8',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            width: 37,
            padding: '6px 0',
            lineHeight: '1.2rem'
        }
    }
}))(TableCell);

export {
    StyledSortLabel,
    StyledCheckbox,
    StyledHeaderTableCell,
    StyledHeaderCheckboxTableCell,
    StyledHeaderIconTableCell,
    StyledIconButton,
    StyledTableRow,
    StyledCheckboxTableCell,
    StyledMainCheckBox,
    StyledTableCell
}