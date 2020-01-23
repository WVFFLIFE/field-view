import React, {useState} from 'react';
import { TableBody, TableRow, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
    StyledHeaderIconTableCell,
    StyledIconButton,
    StyledTableRow,
    StyledCheckboxTableCell,
    StyledMainCheckBox,
    StyledTableCell
} from '../styled-components';
import useReactRouter from 'use-react-router';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { Add } from '@material-ui/icons';
import { stableSort, getSorting } from '../../../utils';

const GridBody = (props) => {
    const [hoverId, setHoverId] = useState('');
    const {
        selectedRows,
        emptyRows,
        order,
        orderBy,
        data,
        handleDelete,
        handleClick,
        headCells,
        partyData,
        personData,
        page,
        rowsPerPage
    } = props;
    
    const { match, history } = useReactRouter();
    const [,path] = match.path.split('/');

    const hoverHandler = (event, id) => {
        setHoverId(id ? id : '')
    }

    return (
        <TableBody>
            {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, idx) => {
                    const isItemSelected = selectedRows.includes(item._id);
                    const labelId = `enhanced-table-checkbox-${idx}`;
                    const isHover = hoverId === item._id;

                    return (
                        <StyledTableRow
                            hover={isHover}
                            key={item._id}
                            selected={isItemSelected}
                            onMouseUp={(event) => {
                                event.stopPropagation(); 
                                history.push(`${match.path}/${item._id}`)
                            }}
                            onMouseEnter={(event) => hoverHandler(event, item._id)}
                            onMouseLeave={(event) => hoverHandler(event)}
                        >
                            <StyledCheckboxTableCell>
                                {isItemSelected ? (
                                    <StyledMainCheckBox
                                        color="default"
                                        onMouseUp={event => handleClick(event, item._id)}
                                        checked={isItemSelected}
                                        inputProps={{ 'aria-labelledby': labelId }} />
                                ) : (
                                    isHover ? (
                                        <StyledMainCheckBox
                                            color="default"
                                            onMouseUp={event => handleClick(event, item._id)}
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }} />
                                    ) : (idx + 1)
                                )}
                            </StyledCheckboxTableCell>
                            {headCells.map(({id: fieldName}, index, array) => {
                                let value;

                                if (fieldName === 'buyerid' || fieldName === 'sellerid') {
                                    value = partyData.filter(el => el._id === item[fieldName]).length !== 0 ? (
                                        partyData.filter(el => el._id === item[fieldName])[0].name
                                    ) : ''
                                } else if (fieldName === 'ownerid') {
                                    value = personData.filter(el => el._id === item[fieldName]).length !== 0 ? (
                                        `${personData.filter(el => el._id === item[fieldName])[0].firstname} ${personData.filter(el => el._id === item[fieldName])[0].lastname}`
                                    ) : ''
                                } else {
                                    value = item[fieldName]
                                }

                                
                                return (
                                    <StyledTableCell key={fieldName}>
                                        {index === array.length -1 ? (
                                            isHover ? (
                                                <div style={{position: 'relative'}}>
                                                    {value}
                                                    <Button onMouseUp={(event) => handleDelete(event, item._id)} style={{position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </div>
                                            ) : value
                                        ) : value}
                                    </StyledTableCell>
                                )
                            })}
                        </StyledTableRow>
                    )
                })}
            {emptyRows > 0 && (
                <StyledTableRow>
                    <StyledTableCell colSpan={6} />
                </StyledTableRow>
            )}
            <TableRow>
                <StyledHeaderIconTableCell>
                    <StyledIconButton onClick={() => history.push(`/create-entity/${path}`)}>
                        <Add />
                    </StyledIconButton>
                </StyledHeaderIconTableCell>
                <StyledTableCell colSpan={headCells.length}></StyledTableCell>
            </TableRow>
        </TableBody>
    )
}

GridBody.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    partyData: PropTypes.arrayOf(PropTypes.object),
    selectedRows: PropTypes.array.isRequired,
    headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default GridBody;