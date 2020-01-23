import { withStyles } from '@material-ui/core/styles';
import {
    Table,
} from '@material-ui/core';

const StyledGrid = withStyles({
    root: {
        width: '100%',
        marginBottom: '15px',
        borderLeft: '1px solid #e8e8e8',
        borderTop: '1px solid #e8e8e8',
        fontSize: '14px'
    }
})(Table);

export {
    StyledGrid
}