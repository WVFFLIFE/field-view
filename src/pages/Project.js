import React, {useState, useEffect, useCallback} from 'react';
import MainGrid from '../containers/MainGrid';
import Spinner from '../components/spinner';
import crmApi from '../services/crm-api';
import {
    projectHeaders
} from '../data-model/table-headers';
import { useAuth0 } from '../react-auth0-spa';

const ProjectPage = () => {
    const [data, setData] = useState(null);
    const { getTokenSilently } = useAuth0();

    const getData = useCallback(async () => {
        const token = await getTokenSilently();

        await crmApi.fetchProjectDataGrid(token)
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
            path="project"
            headCells={projectHeaders}
            data={data.projectData}
            partyData={data.partyData}
            personData={data.personData}
            orderBy="customerid"
            getData={getData}/>
    ) : <Spinner />
}

export default ProjectPage;