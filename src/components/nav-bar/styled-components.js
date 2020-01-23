import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import { withStyles } from '@material-ui/core/styles';

const StyledList = withStyles({
    root: {
        paddingTop: 8
    }
})(List);

const StyledListItem = withStyles({
    root: {
        minHeight: '38px',
        marginBottom: '10px',
        padding: '3px 11px',
        paddingLeft: '10px',
        border: '1px solid transparent',
    },
    selected: {
        border: '1px solid rgba(0, 80, 179, 0.52)',
        borderRadius: '2px',
        backgroundColor: '#fff !important',
        "&::before": {
            content: "''",
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            height: '100%',
            background: '#0050b3',
            borderRadius: '4px'
        }
    }
})(ListItem);

const StyledInboxIcon = withStyles({
    root: {
        width: '23px',
        height: '23px'
    }
})(InboxIcon);

const StyledIconButton = withStyles({
    root: {
        padding: '2px',
    }
})(IconButton);

const StyledListItemText = withStyles({
    root: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    primary: {
        fontSize: '14px',
        fontFamily: 'SegoeUIRegular',
        lineHeight: '22px',
        color: '#4c4c51',
    }
})(ListItemText);

const StyledListItemIcon = withStyles({
    root: {
        minWidth: '36px'
    }
})(ListItemIcon)

export {
    StyledListItem,
    StyledIconButton,
    StyledListItemText,
    StyledListItemIcon,
    StyledList,
    StyledInboxIcon
}