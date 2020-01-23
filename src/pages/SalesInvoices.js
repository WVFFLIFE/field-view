import React, {useState, useEffect, useCallback} from 'react';
import MainGrid from '../containers/MainGrid';
import Spinner from '../components/spinner';
import crmApi from '../services/crm-api';
import {
    salesInvoiceHeaders
} from '../data-model/table-headers';
import { useAuth0 } from '../react-auth0-spa';

const GridPage = () => {
    const [data, setData] = useState(null);
    const { getTokenSilently } = useAuth0();

    const getData = useCallback(async () => {
        const token = await getTokenSilently();

        await crmApi.fetchDataForSalesInvoiceTable(token)
            .then(data => {
                setData(data)
            })
    }, [getTokenSilently])

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getData();
        }

        return () => {
            mounted = false;
        };
    }, [getData]);

    return data ? (
        <MainGrid
            path="sales-invoice"
            headCells={salesInvoiceHeaders}
            data={data.salesInvoiceData}
            partyData={data.partyData}
            personData={data.personData}
            orderBy="number"
            getData={getData}/>
    ) : <Spinner />
}

export default GridPage;