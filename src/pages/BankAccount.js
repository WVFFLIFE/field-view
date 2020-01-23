import React, {Component} from 'react';
import MainGrid from '../containers/MainGrid';
import Spinner from '../components/spinner';
import crmApi from '../services/crm-api';
import { withRouter } from 'react-router-dom';
import {
    bankAccountHeaders
} from '../data-model/table-headers';

class GridPage extends Component {
    state = {
        data: null,
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                data: null,
                loading: true
            })
            this.getData();
        }
    }

    getData = async () => {
        await crmApi.getData('bankaccount')
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
                path="bank-account"
                headCells={bankAccountHeaders}
                data={data}
                getData={this.getData}
                orderBy="BIC"
            />
        )
    }
}

export default withRouter(GridPage);