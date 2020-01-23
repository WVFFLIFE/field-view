import React, {useState, useEffect} from 'react';
import GridHeader from '../../components/grid-view/grid-header';
import EditorGridBody from '../../components/grid-view/editor-grid-body';
import { StyledGrid } from './styled-components';
import { LinearProgress } from '@material-ui/core'
import { setMainField, getEmptyEntity } from '../../data-model/data-converter';
import Spinner from '../../components/spinner';
import crmApi from '../../services/crm-api';
import _ from 'lodash';
import { useAuth0 } from '../../react-auth0-spa';

const SubGrid = (props) => {
    const [formState, setFormState] = useState(props.data);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(props.orderBy);
    const [selectedRows, setSelectedRows] = useState([]);
    const [requestStatus, setRequestStatus] = useState(false);
    const {getTokenSilently} = useAuth0();

    useEffect(() => {
        setFormState(props.data);
    }, [props.data]);

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

    const countTotalAmountAndUpdate = async (arr, token) => {
        const totalAmountCount = arr.reduce((s, c) => {
            return s + c.totalamountvatincluding
        }, 0);

        await crmApi.updateFieldsWithToken('invoice', props.invoiceId, { totalamount: totalAmountCount }, token);
    }

    const handleDelete = async (event, id) => {
        event.stopPropagation();
        setRequestStatus(true)
        const token = await getTokenSilently();
        const filteredData = formState.filter(item => item._id !== id);

        await crmApi.deleteEntityWithToken(props.path, id, token)
            .then(async (status) => {
                if (status) {
                    await countTotalAmountAndUpdate(filteredData, token);
                    await props.getData();
                    setRequestStatus(false);
                    setSelectedRows(prevSelectedRows => prevSelectedRows.filter(item => item !== id))
                }
            })
    }

    const handleFieldChange = (event, id) => {
        const { name, value } = event.target;
        event.persist();
        setFormState(currentFormState => {
            return props.path === 'invoiceline' ? (
                currentFormState.map(item => {
                    return item._id === id ? {
                        ...item,
                        [name]: value,
                        'totalamountvatincluding': name === 'price' ? value * item.quantity : name === 'quantity' ? value * item.price : item.totalamountvatincluding
                    } : item
                })
            ) : (
                currentFormState.map(item => {
                    return item._id === id ? {
                        ...item,
                        [name]: value,
                    } : item
                })
            )
        })
    }

    const handleLookUpFieldChange = (event, data, name, id) => {
        const mainFieldName = setMainField(name);
        event.persist();
        setFormState(currentFormState => {
            return currentFormState.map(item => {
                return item._id === id ? {
                    ...item,
                    [name]: typeof data === 'object' && data !== null ? {
                        _id: data._id,
                        [mainFieldName]: data[mainFieldName]
                    } : ''
                } : item
            })
        })
    }

    const updateFields = async (event, id) => {
        if (!_.isEqual(data, formState)) {
            setRequestStatus(true);
            const [updatedData] = formState.filter(item => item._id === id);
            const { path, getData } = props;

            const token = await getTokenSilently();

            await crmApi.updateFieldsWithToken(path, id, updatedData, token)
                .then(async (status) => {
                    if (status) {
                        await countTotalAmountAndUpdate(formState, token);
                        await getData();
                        setRequestStatus(false);
                    }
                })
        }

        return;
    }

    const addNewRow = async () => {
        setRequestStatus(true);
        const token = await getTokenSilently();

        crmApi.createNewEntityWithToken(path, {
            ...getEmptyEntity(path),
            invoiceid: props.invoiceId
        }, token)
        .then(async (status) => {
            if (status) {
                await props.getData();
                setRequestStatus(false);
            }
        })
    }

    if (!formState) return <Spinner />

    const {data, headCells, path} = props;

    return (
        <div style={{
            overflow: 'hidden',
            overflowX: 'auto'
        }}>
            {requestStatus ? <LinearProgress /> : <div style={{ height: '4px' }}></div>}
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
                    data={formState}
                    path={path}
                    selectedRows={selectedRows}
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    addNewRow={addNewRow}
                    requestStatus={requestStatus}
                    handleDelete={handleDelete}
                    handleClick={handleClick}
                    updateFields={updateFields}
                    handleFieldChange={handleFieldChange}
                    handleLookUpFieldChange={handleLookUpFieldChange}
                />
            </StyledGrid>
        </div>
    )
}

export default SubGrid;