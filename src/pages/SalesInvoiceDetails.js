import React, { useState, useEffect, useCallback } from 'react';
import useReactRouter from 'use-react-router';
import Spinner from '../components/spinner';
import CardApp from '../containers/CardApp';
import { Grid } from '@material-ui/core';
import { createDataForCard, createDataForGrid, transformToCardTitle } from '../data-model/data-converter';
import crmApi from '../services/crm-api';
import {invoiceLinesHeaders} from '../data-model/table-headers';
import SubGrid from '../containers/SubGrid';
import EntityAssets from '../containers/EntityAssets';
import { useAuth0 } from '../react-auth0-spa';
import Files from '../containers/Files';

const Details = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getTokenSilently } = useAuth0();
    const { match } = useReactRouter();

    const getData = useCallback(async () => {
        const token = await getTokenSilently();

        await crmApi.fetchDataForInvoiceDetails(match.params.id, token)
            .then(data => {
                setLoading(false);
                setData(data)
            })
    }, [match.params.id, getTokenSilently])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getData();
        }

        return () => {
            mounted = false;
        };
    }, [getData])
    

    if (!data || loading) {
        return <Spinner />
    }

    const cardData = createDataForCard('sales-invoice', data.invoiceDetailsData);
    const subGridData = data.invoiceLinesData.map(item => createDataForGrid('invoiceline', item));
    
    return (
        <Grid container spacing={3}>
            {Object.keys(cardData).map(field => {
                let fieldData = cardData[field];
                const title = transformToCardTitle(field);
                return (
                    <Grid item lg={5} xs={12} key={field}>
                        <CardApp
                            title={title}
                            mainid={data.invoiceDetailsData._id}
                            getData={getData}
                            field={field}
                            data={fieldData}
                        />
                    </Grid>
                )
            })}
            <Grid item lg={7} xs={12}>
                <SubGrid
                    getData={getData}
                    path="invoiceline"
                    invoiceId={data.invoiceDetailsData._id}
                    orderBy="id"
                    headCells={invoiceLinesHeaders}
                    data={subGridData}
                />
            </Grid>
            {!!data.invoiceFiles.files.length && (
                <Grid item xs={12}>
                    <Files 
                        files={data.invoiceFiles.files}
                        filesContainer={data.invoiceFiles.filesContainer}
                        getData={getData}/>
                </Grid>
            )}
            <Grid item xs={12}>
                <EntityAssets
                    getData={getData}
                    mainid={data.invoiceDetailsData._id}
                />
            </Grid>
        </Grid>
    )
}

export default Details