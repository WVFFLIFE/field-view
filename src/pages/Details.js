import React, { useState, useEffect, useCallback } from 'react';
import Spinner from '../components/spinner';
import CardApp from '../containers/CardApp';
import { Grid } from '@material-ui/core';
import { transformToCardTitle } from '../data-model/data-converter';
import crmApi from '../services/crm-api';
import useReactRouter from 'use-react-router'

const Details = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { location } = useReactRouter();

    const getData = useCallback(() => {
        let [path, id] = location.pathname.split('/').filter(el => el !== '');
        path = path.includes('-') ? path.split('-').join('') : path;

        crmApi.fetchDetails(path, id)
            .then(data => {
                if (data) {
                    setData(data);
                    setLoading(false);
                }
            })
    }, [location.pathname]);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            getData();
        }

        return () => {
            mounted = false;
        }
    }, [getData]);

    if (loading) return <Spinner />
    const [, path] = location.pathname.split('/');

    return (
        <Grid container spacing={3}>
            {Object.keys(data).map(field => {
                let fieldData = data[field];
                const title = transformToCardTitle(field);
                return (
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        key={field}
                    >
                        <CardApp
                            title={title}
                            mainid={data[path.split('-').join('')]._id}
                            getData={getData}
                            field={field}
                            data={fieldData}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default Details;