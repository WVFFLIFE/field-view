import React, {useState} from 'react';
import { 
    TableBody, 
    TableRow, 
    Button, 
    TablePagination,
    makeStyles
} from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
    spacer: {
        [theme.breakpoints.down('md')]: {
            flex: 0
        }
    }
}))

const GridBody = (props) => {
    const classes = useStyles();
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
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
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
                    <StyledIconButton onClick={() => history.push(`/${path}/create-entity`)}>
                        <Add />
                    </StyledIconButton>
                </StyledHeaderIconTableCell>
                <StyledTableCell colSpan={headCells.length}></StyledTableCell>
            </TableRow>
            <TableRow>
                <StyledTableCell
                    colSpan={headCells.length + 1}
                    style={{
                        padding: '3px'
                    }}
                >
                    <TablePagination 
                        classes={{
                            spacer: classes.spacer
                        }}
                        component="div"
                        count={data.length}
                        rowsPerPageOptions={[5, 10]}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </StyledTableCell>
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