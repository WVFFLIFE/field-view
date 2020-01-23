import React, { Component } from 'react';
import CardApp from '../containers/CardApp/CardApp';
import {Grid} from '@material-ui/core';
import Spinner from '../components/spinner';
import {createDataForCard} from '../data-model/data-converter';
import crmApi from '../services/crm-api';

class Organization extends Component {
    state = {
        data: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const {id} = this.props.match.params;
        const types = this.props.location.search.split('=')[1].split(',');
        crmApi.getMainData(types, id)
            .then(data => {
                this.setState({
                    loading: false,
                    data,
                    error: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    data: null,
                    error: true
                })
            });
    }

    render() {
        const {data} = this.state;
        const types = this.props.location.search.split('=')[1].split(',');
        const pageid = this.props.match.params.id;
        
        if (!data) {
            return <Spinner />
        }

        const partialData = types.map((type, idx) => {
            const [mainData] = data[idx].filter(el => {
                return el.partyid.length > 0 ? el.partyid[0]._id === pageid : el._id === pageid 
            });
            return createDataForCard(type, mainData);
        });

        return (
            <Grid container spacing={3}>
                {partialData.map(el => {
                    return Object.keys(el).map(field => (
                        <Grid item xs={5} key={field}>
                            <CardApp
                                getData={this.getData}
                                field={field}
                                data={el[field]}
                            />
                        </Grid>
                    ))
                })}
            </Grid>
        )
    }
}

export default Organization;