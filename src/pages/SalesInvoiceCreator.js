import React, { useState, useCallback } from 'react';
import EntityCreatorView from '../components/entity-creator-view';
import crmApi from '../services/crm-api';
import { getEmptyEntity, setMainField } from '../data-model/data-converter';
import useReactRouter from 'use-react-router';
import { Button, Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import {LinearProgress} from '@material-ui/core';
import SubGridCreator from '../containers/SubGridCreator';
import {invoiceLinesHeaders} from '../data-model/table-headers';
import FilesDropZone from '../components/filesdropzone';
import { useAuth0 } from '../react-auth0-spa';

const StyledButton = withStyles({
    root: {
        marginTop: '15px',
        background: '#43a047',
        color: '#fff',
        fontFamily: 'SegoeUIRegular'
    }
})(Button);

const SalesInvoiceCreator = () => {
    const [data, setData] = useState({
        invoice: getEmptyEntity('sales-invoice'),
        invoiceline: [],
        invoiceFiles: []
    });
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState('');
    const { getTokenSilently } = useAuth0();
    const {history} = useReactRouter();

    const createEntity = async () => {
        setLoading(true);
        const token = await getTokenSilently();
        const formData = new FormData();
        for (const file of data.invoiceFiles) {
            formData.append('file', file, file.name)
        }

        crmApi.createSalesInvoiceWithToken({invoice: data.invoice, invoiceline: data.invoiceline, invoiceFiles: formData}, token)
            .then(status => {
                if (status) {
                    setLoading(false);
                    history.push('/sales-invoice')
                }
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
            })
    }

    const handleFieldChange = event => {
        event.persist();
        setData((currentData) => ({
            ...currentData,
            invoice: {
                ...currentData.invoice,
                [event.target.name]: event.target.value
            }
        }))
    }

    const handleChangeDate = (value, name) => {
        setData((currentData) => ({
            ...currentData,
            invoice: {
                ...currentData.invoice,
                [name]: value
            }
        }))
    }

    const handleLookUpFieldChange = (event, data, name) => {
        const mainFieldName = setMainField(name);
        event.persist();

        setData(currentData => {
            if (name === 'ownerid') {
                return {
                    ...currentData,
                    invoice: {
                        ...currentData.invoice,
                        'ownerid': typeof data === 'object' && data !== null ? {
                            _id: data._id,
                            firstname: data['firstname'],
                            lastname: data['lastname']
                        } : ''
                    }
                }
            }

            return {
                ...currentData,
                invoice: {
                    ...currentData.invoice,
                    [name]: typeof data === 'object' && data !== null ? {
                        _id: data._id,
                        [mainFieldName]: data[mainFieldName]
                    } : ''
                }
            }
        })
    }

    const handleSubGridFieldChange = (event, id) => {
        const { name, value } = event.target;
        event.persist();

        setData((currentData) => ({
            ...currentData,
            invoiceline: currentData.invoiceline.map((item, idx) => {
                return idx === id ? {
                    ...item,
                    [name]: value,
                    'totalamountvatincluding': name === 'price' ? value * item.quantity : name === 'quantity' ? value * item.price : item.totalamountvatincluding
                } : item
            })
        }))
    }

    const handleSubGridLookUpFieldChange = (event, data, name, id) => {
        const mainFieldName = setMainField(name);
        event.persist();

        setData((currentData) => ({
            ...currentData,
            invoiceline: currentData.invoiceline.map((item, idx) => {
                return idx === id ? {
                    ...item,
                    [name]: typeof data === 'object' && data !== null ? {
                        _id: data._id,
                        [mainFieldName]: data[mainFieldName]
                    } : ''
                } : item
            })
        }))
    }

    const handleTagChange = (event) => {
        event.persist && event.persist();
        setTag(event.target.value)
    }

    const handleTagAdd = () => {
        setData(currentData => {
            return {
                ...currentData,
                invoice: !currentData.invoice.additionalnote.includes(tag) ? {
                    ...currentData.invoice,
                    additionalnote: [...currentData.invoice.additionalnote, tag]
                } : currentData.invoice
            }
        })

        setTag('');
    }

    const handleTagDelete = (tag) => {
        setData(currentData => {
            return {
                ...currentData,
                invoice: {
                    ...currentData.invoice,
                    additionalnote: currentData.invoice.additionalnote.filter(t => t !== tag)
                }
            }
        })
    }

    const handleAddNewRow = () => {
        setData((currentData) => ({
            ...currentData,
            invoiceline: [
                ...currentData.invoiceline,
                getEmptyEntity('invoiceline')
            ]
        }))
    }

    const handleDeleteRow = (event, id) => {
        event.stopPropagation();
        setData((currentData) => ({
            ...currentData,
            invoiceline: currentData.invoiceline.filter((item, idx) => idx !== id)
        }))
    }

    const handleDrop = useCallback(acceptedFiles => {
        setData(prevFiles => {
            const {invoiceFiles: prevInvoiceFiles} = prevFiles;
            return {
                ...prevFiles,
                invoiceFiles: prevInvoiceFiles.filter(t => t.path === acceptedFiles[0].path).length === 0 ? [...prevInvoiceFiles].concat(acceptedFiles) : [...prevInvoiceFiles]
            }
        })
    }, []);

    const removeFile = (name) => {
        setData(prevFiles => {
            const {invoiceFiles: prevInvoiceFiles} = prevFiles;

            return {
                ...prevFiles,
                invoiceFiles: prevInvoiceFiles.filter(item => item.name !== name)
            }
        })
    }

    return (
        <>
            {!loading ? <div style={{height: '4px'}}></div> : <LinearProgress />}
            <EntityCreatorView
                handleFieldChange={handleFieldChange}
                handleChangeDate={handleChangeDate}
                handleLookUpFieldChange={handleLookUpFieldChange}
                handleTagAdd={handleTagAdd}
                handleTagDelete={handleTagDelete}
                handleTagChange={handleTagChange}
                tag={tag}
                field={'invoice'}
                data={data.invoice}
            />
            <SubGridCreator
                path="invoiceline"
                orderBy=""
                data={data.invoiceline}
                handleAddNewRow={handleAddNewRow}
                handleDeleteRow={handleDeleteRow}
                handleSubGridLookUpFieldChange={handleSubGridLookUpFieldChange}
                handleSubGridFieldChange={handleSubGridFieldChange}
                headCells={invoiceLinesHeaders}
            />
            <Card>
                <CardContent>
                    <FilesDropZone
                        files={data.invoiceFiles}
                        removeFile={removeFile}
                        handleDrop={handleDrop}
                        creator={true}
                    />
                </CardContent>
            </Card>
            <StyledButton
                disabled={loading}
                variant="contained"
                onClick={createEntity}
            >
                Create
            </StyledButton>
        </>
    )
}

export default SalesInvoiceCreator