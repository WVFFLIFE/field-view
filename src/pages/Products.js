import React, {Component} from 'react';
import Spinner from '../components/spinner';
import crmApi from '../services/crm-api';
import MainGrid from '../containers/MainGrid';
import {
    productsHeaders
} from '../data-model/table-headers';

class GridPage extends Component {
    state = {
        data: null,
        partyData: null,
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        crmApi.getData('product')
            .then(data => {
                this.setState({
                    loading: false,
                    data,
                    error: false
                })
            })
            .catch(err => {
                this.setState({
                    data: null,
                    loading: false,
                    error: true
                })
            })
    }

    render() {
        const {data, loading} = this.state;

        if (loading) return <Spinner />

        return (
           <MainGrid
                headCells={productsHeaders}
                data={data}
                path="product"
                orderBy="industry"
                getData={this.getData}/>
        )
    }
}

export default GridPage;