import React, { useState, useEffect, useCallback } from 'react';
import Spinner from '../components/spinner';
import CardApp from '../containers/CardApp';
import { Grid } from '@material-ui/core';
import { transformToCardTitle } from '../data-model/data-converter';
import crmApi from '../services/crm-api';
import useReactRouter from 'use-react-router'
import Comments from '../components/comments';
import SocialProfile from '../components/social-profile';

const OrganizationDetails = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { match } = useReactRouter();

    const fetchData = useCallback(() => {
        const { id } = match.params;

        crmApi.fetchDetails('organization', id)
            .then(data => {
                if (data) {
                    setData(data);
                    setLoading(false);
                }
            })
    }, [match.params]);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            fetchData();
        }

        return () => {
            mounted = false;
        }
    }, [fetchData]);

    if (loading) return <Spinner />

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
                            mainid={data['organization']._id}
                            getData={fetchData}
                            field={field}
                            data={fieldData}
                        />
                    </Grid>
                )
            })}
            <Grid
                item
                xs={12}
                lg={6}
            >
                <Comments
                    partyid={data.party._id}
                />
            </Grid>
            <Grid
                item
                xs={12}
                lg={6}
            >
                <SocialProfile 
                    partyid={data.party._id}
                />
            </Grid>
        </Grid>
    )
}

export default OrganizationDetails;