import React from 'react';
import {
    TableHead,
    TableRow
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import PropTypes from 'prop-types';
import {
    StyledHeaderCheckboxTableCell,
    StyledCheckbox,
    StyledHeaderTableCell,
    StyledSortLabel
} from '../styled-components';

const GridHeader = (props) => {
    const { order, orderBy, onSelectAllClick,
        onRequestSort, headCells, numSelected,
        rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <StyledHeaderCheckboxTableCell>
                    <StyledCheckbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        color="default"
                        onChange={onSelectAllClick} />
                </StyledHeaderCheckboxTableCell>
                {headCells.map((headCell, idx) => (
                    <StyledHeaderTableCell
                        key={`${headCell.id}-${idx}`}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <StyledSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            IconComponent={ArrowDropDown}
                            onClick={() => onRequestSort(headCell.id)}
                        >
                            {headCell.label}
                        </StyledSortLabel>
                    </StyledHeaderTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

GridHeader.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
    numSelected: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired
}

export default React.memo(GridHeader);