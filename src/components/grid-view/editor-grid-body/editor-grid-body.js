import React, {useState} from 'react';
import { TableBody, TableRow, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import {
    StyledHeaderIconTableCell,
    StyledIconButton,
    StyledTableRow,
    StyledCheckboxTableCell,
    StyledMainCheckBox,
    StyledTableCell
} from '../styled-components';
import { Add } from '@material-ui/icons';
import { stableSort, getSorting } from '../../../utils';
import {formModel} from '../../../data-model/form';
import LookUp from '../../controls/look-up';
import TextField from '../../controls/text-field'

const EditorGridBody = (props) => {
    const [hoverId, setHoverId] = useState('');
    const {
        path,
        headCells,
        selectedRows,
        data,
        order,
        orderBy,
        addNewRow,
        handleDelete,
        handleClick,
        updateFields,
        requestStatus,
        handleFieldChange,
        handleLookUpFieldChange,
    } = props;

    const hoverHandler = (event, id) => {
        setHoverId(id ? id : '')
    }

    const [options] = formModel.filter(obj => {
        return obj.groupName.toLowerCase().split(' ').join('') === path;
    });

    return (
        <TableBody>
            {stableSort(data, getSorting(order, orderBy)).map((item, idx) => {
                const itemId = item._id || idx;
                const isItemSelected = selectedRows.includes(itemId);
                const labelId = `enhanced-table-checkbox-${idx}`;
                const isHover = hoverId === itemId;

                return (
                    <StyledTableRow
                        hover={isHover}
                        key={itemId}
                        selected={isItemSelected}
                        onMouseEnter={(event) => hoverHandler(event, itemId)}
                        onMouseLeave={(event) => hoverHandler(event)}
                    >
                        <StyledCheckboxTableCell>
                            {isItemSelected ? (
                                <StyledMainCheckBox
                                    color="default"
                                    onMouseUp={event => handleClick(event, itemId)}
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }} />
                            ) : (
                                    isHover ? (
                                        <StyledMainCheckBox
                                            color="default"
                                            onMouseUp={event => handleClick(event, itemId)}
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }} />
                                    ) : (idx + 1)
                                )}
                        </StyledCheckboxTableCell>
                        {headCells.map(({ id: fieldName }, index, array) => {
                            const value = data.filter((obj, index) => (obj._id || index) === itemId)[0][fieldName];

                            const [fieldOptions] = options.fieldsGroup[0].fields.filter(obj => {
                                return obj.name === fieldName
                            });

                            return (
                                <StyledTableCell
                                    key={fieldName}
                                >
                                    <div style={{position: 'relative'}}>
                                        {fieldOptions.type === 'text' && fieldOptions.editable === true ? (
                                            <TextField
                                                name={fieldName}
                                                type="text"
                                                value={value}
                                                disabled={requestStatus}
                                                changeHandler={(event) => handleFieldChange(event, itemId)}
                                                updateHandler={(event) => updateFields(event, itemId)}
                                            />
                                        ) : fieldOptions.type === 'number' ? (
                                            <TextField
                                                name={fieldName}
                                                type="number"
                                                value={value}
                                                disabled={requestStatus}
                                                changeHandler={(event) => handleFieldChange(event, itemId)}
                                                updateHandler={(event) => updateFields(event, itemId)}
                                            />
                                        ) : fieldOptions.type === 'lookUp' ? (
                                            <LookUp
                                                name={fieldName}
                                                value={value}
                                                disabled={requestStatus}
                                                changeHandler={(event, data) => handleLookUpFieldChange(event, data, fieldName, itemId)}
                                                updateHandler={(event) => updateFields(event, itemId)}
                                            />
                                        ) : value}
                                        {index === array.length - 1 ? (
                                            isHover ? (
                                                <Button 
                                                    onMouseUp={(event) => handleDelete(event, itemId)}
                                                    disabled={requestStatus}
                                                    style={{position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                                                    <DeleteIcon />
                                                </Button>
                                            ) : null
                                        ) : null}
                                    </div>
                                </StyledTableCell>
                            )
                        })}
                    </StyledTableRow>
                )
            })}
            <TableRow>
                <StyledHeaderIconTableCell>
                    <StyledIconButton onClick={addNewRow}>
                        <Add />
                    </StyledIconButton>
                </StyledHeaderIconTableCell>
                <StyledTableCell colSpan={headCells.length}></StyledTableCell>
            </TableRow>
        </TableBody>
    )
}

export default EditorGridBody;