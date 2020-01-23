import React, { useState } from 'react';
import GridHeader from '../../components/grid-view/grid-header';
import EditorGridBody from '../../components/grid-view/editor-grid-body';
import { StyledGrid } from './styled-components';

const SubGridCreator = ({ data, headCells, path, handleAddNewRow, handleDeleteRow, handleSubGridLookUpFieldChange, handleSubGridFieldChange, ...props }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.orderBy);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleClick = (event, id) => {
        const { checked } = event.target;
        event.stopPropagation();
        setSelectedRows(prevSelectedRows => {
            return checked ? prevSelectedRows.filter(item => item !== id) : [...prevSelectedRows, id]
        })
    }

    const handleSelectAllClick = (event) => {
        const { checked } = event.target;
        setSelectedRows(checked ? props.data.map(item => item._id) : [])
    }

    const sortByField = (field) => {
        const isDesc = orderBy === field && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(field)
    }

    return (
        <div style={{
            overflow: 'hidden',
            overflowX: 'auto'
        }}>
            <StyledGrid>
                <GridHeader
                    rowCount={data.length}
                    headCells={headCells}
                    numSelected={selectedRows.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={sortByField}
                />
                <EditorGridBody
                    data={data}
                    path={path}
                    selectedRows={selectedRows}
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    addNewRow={handleAddNewRow}
                    handleClick={handleClick}
                    handleDelete={handleDeleteRow}
                    updateFields={() => { }}
                    handleFieldChange={handleSubGridFieldChange}
                    handleLookUpFieldChange={handleSubGridLookUpFieldChange}
                />
            </StyledGrid>
        </div>
    )
}

export default SubGridCreator;