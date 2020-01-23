import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './components/error-boundary';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Auth0Provider } from './react-auth0-spa';
import config from './auth_config.json';
import history from './utils/history';
import "./fonts/fonts.css";
import './index.css';

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    )
}

ReactDOM.render(
    <ErrorBoundary>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Auth0Provider
                domain={config.domain}
                client_id={config.clientId}
                audience={config.audience}
                redirect_uri={process.env.NODE_ENV === 'production' ? config.redirectUri : window.location.origin}
                onRedirectCallback={onRedirectCallback}
            >
                <App />
            </Auth0Provider>
        </MuiPickersUtilsProvider>
    </ErrorBoundary>,
    document.getElementById('root')
);