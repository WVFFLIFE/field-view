import React from 'react';
import { Input, Button, Chip } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const StyledInput = withStyles({
    root: {
        flexGrow: 2,
        marginRight: '5px',
        padding: '3px 12px',
        fontSize: '13px',
        fontFamily: 'SegoeUIRegular',
        border: '1px solid #D9D9D9',
        borderRadius: '4px',
        color: '#4C4C51'
    }
})(Input);

const StyledButton = withStyles({
    root: {
        minWidth: '34px'
    }
})(Button);

const Multiline = ({name, tag, tags, handleTagChange, handleTagAdd, handleTagDelete, disabled}) => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '5px'
                }}
            >
                <StyledInput
                    type="text"
                    id={`id-${name}`}
                    name="tag"
                    value={tag}
                    disableUnderline={true}
                    disabled={disabled}
                    margin="none"
                    onChange={handleTagChange}
                />
                <StyledButton
                    disabled={!tag || disabled}
                    onClick={handleTagAdd}
                    size="small"
                >
                    <Add />
                </StyledButton>
            </div>
            <div>
                {tags.map(tag => (
                    <Chip
                        style={{
                            marginRight: '3px',
                            marginBottom: '3px'
                        }}
                        deleteIcon={<Close />}
                        key={tag}
                        label={tag}
                        onDelete={() => handleTagDelete(tag)}
                    />
                ))}
            </div>
        </>
    )
}

export default Multiline;