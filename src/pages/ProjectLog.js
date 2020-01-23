import React, {useState, useEffect, useCallback} from 'react';
import MainGrid from '../containers/MainGrid';
import Spinner from '../components/spinner';
import crmApi from '../services/crm-api';
import {
    projectLogHeaders
} from '../data-model/table-headers';
import { useAuth0 } from '../react-auth0-spa';

const ProjectLogPage = () => {
    const [data, setData] = useState(null);
    const { getTokenSilently } = useAuth0();

    const getData = useCallback(async () => {
        const token = await getTokenSilently();

        await crmApi.getDataWithToken('projectlog', token)
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
            path="projectlog"
            headCells={projectLogHeaders}
            data={data}
            orderBy="totalamount"
            getData={getData}/>
    ) : <Spinner />
}

export default ProjectLogPage;