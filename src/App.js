import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from './components/spinner';
import history from './utils/history';
import { makeStyles } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
import Login from './pages/Login';
import Dashboard from './containers/Dashboard';

const useStyles = makeStyles(theme => ({
    loginContent: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f7ff'
    }
}))

const App = () => {
    const classes = useStyles();
    const { loading, isAuthenticated } = useAuth0();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Spinner />
            </div>
        )
    }
    

    return (
        <Router history={history}>
            <div className="crm-app">
                {isAuthenticated ? (
                    <Dashboard />
                ) : (
                    <div className={classes.loginContent}>
                        <Switch>
                            <Route path="/login" exact component={Login}/>
                            <Redirect to="/login"  />
                        </Switch>
                    </div>
                )}
            </div>
        </Router>
    )
}

export default App;