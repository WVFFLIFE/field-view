import React, { useState, useEffect, useCallback } from 'react';
import MainGrid from '../containers/MainGrid';
import Spinner from '../components/spinner';
import crmApi from '../services/crm-api';
import {
    socialPlatformHeaders
} from '../data-model/table-headers';

const SocialPlatform = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getData = useCallback(() => {
        crmApi.getData('socialplatform')
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.error(err);
            })
    }, []);

    useEffect(() => {
        let mounted = false;

        if (!mounted) {
            getData();
        }

        return () => {
            mounted = true;
        }
    }, [getData]);

    if (loading) return <Spinner />

    return (
        <MainGrid
            headCells={socialPlatformHeaders}
            getData={getData}
            data={data}
            path="socialplatform"
            orderBy="name"
        />
    )
}

export default SocialPlatform;