import React, {Component} from 'react';
import Spinner from '../components/spinner';
import crmApi from '../services/crm-api';
import MainGrid from '../containers/MainGrid';
import { withRouter } from 'react-router-dom';
import {
    organizationsHeaders
} from '../data-model/table-headers';

class GridPage extends Component {
    state = {
        data: null,
        loading: true,
        error: false
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
        await crmApi.getData('organization')
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
                headCells={organizationsHeaders}
                getData={this.getData}
                data={data}
                path="organization"
                orderBy="industry"
            />
        )
    }
}

export default withRouter(GridPage);