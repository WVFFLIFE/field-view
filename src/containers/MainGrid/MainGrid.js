import React, {useState} from 'react';
import PropTypes from 'prop-types';
import GridHeader from '../../components/grid-view/grid-header';
import GridBody from '../../components/grid-view/grid-body';
import { StyledGrid } from './styled-components';
import { LinearProgress, TablePagination, makeStyles } from '@material-ui/core'
import { createDataForGrid } from '../../data-model/data-converter';
import crmApi from '../../services/crm-api';
import { useAuth0 } from '../../react-auth0-spa';
import {setToLocalStorage, getFromLocalStorage} from '../../utils/index';

const useStyles = makeStyles(theme => ({
    root: {
        border: '1px solid #e8e8e8',
        borderTop: 'none'
    }
}))

const MainGrid = (props) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.orderBy);
    const [selectedRows, setSelectedRows] = useState([]);
    const [requestStatus, setRequestStatus] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getFromLocalStorage('rows') || 10);
    const {getTokenSilently} = useAuth0();

    const handleClick = (event, id) => {
        const {checked} = event.target;
        event.stopPropagation();
        setSelectedRows(prevSelectedRows => {
            return checked ? prevSelectedRows.filter(item => item !== id) : [...prevSelectedRows, id]
        })
    }

    const handleSelectAllClick = (event) => {
        const {checked} = event.target;
        setSelectedRows(checked ? props.data.map(item => item._id) : [])
    }

    const sortByField = (field) => {
        const isDesc = orderBy === field && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(field)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        const rows = parseInt(event.target.value, 10);
        setRowsPerPage(rows);
        setToLocalStorage('rows', rows);
        setPage(0);
    }

    const handleDelete = async (event, id) => {
        event.stopPropagation();
        setRequestStatus(true);
        const token = await getTokenSilently();
        const url = props.path.split('-').join('');

        await crmApi.deleteEntityWithToken(url, id, token);
        await props.getData();

        setRequestStatus(false);
        setSelectedRows(prevSelectedRows => {
            return prevSelectedRows.filter(item => item !== id)
        })
    }

    const gridData = props.data.map(item => createDataForGrid(props.path, item));
    const emtyRows = rowsPerPage - Math.min(rowsPerPage, gridData.length - page * rowsPerPage);

    return (
        <div style={{
            overflow: 'hidden',
            overflowX: 'auto'
        }}>
            {requestStatus ? <LinearProgress /> : <div style={{ height: '4px' }}></div>}
            <StyledGrid>
                <GridHeader 
                    rowCount={gridData.length}
                    headCells={props.headCells}
                    numSelected={selectedRows.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={sortByField}
                />
                <GridBody 
                    page={page}
                    rowsPerPage={rowsPerPage}
                    data={gridData}
                    emtyRows={emtyRows}
                    partyData={props.partyData}
                    personData={props.personData}
                    selectedRows={selectedRows}
                    headCells={props.headCells}
                    order={order}
                    orderBy={orderBy}
                    handleDelete={handleDelete}
                    handleClick={handleClick}
                />
            </StyledGrid>
            <TablePagination
                className={classes.root}
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={gridData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

MainGrid.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    path: PropTypes.string.isRequired,
    partyData: PropTypes.arrayOf(PropTypes.object),
    orderBy: PropTypes.string.isRequired
}

export default MainGrid;