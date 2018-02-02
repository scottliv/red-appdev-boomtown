import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import client from './config/apolloClient';

import store from './redux/store';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';

import PrivateRoute from './components/PrivateRoute';
import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';
import Share from './containers/Share';
import { firebaseAuth } from './config/firebaseConfig';
import { updateAuthState, userLoading } from './redux/modules/auth';

let gotUser = false;

store.subscribe(() => {
    const values = store.getState();
    if (values.auth.authenticated !== 'LOADING_USER' && !gotUser) {
        gotUser = true;
        store.dispatch(userLoading(false));
    }
});

firebaseAuth.onAuthStateChanged(user => {
    if (user) {
        store.dispatch(updateAuthState(user));
    } else {
        store.dispatch(updateAuthState(false));
    }
});

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Layout>
                            <div className="page">
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute
                                    exact
                                    path="/"
                                    component={Items}
                                />
                                <PrivateRoute
                                    exact
                                    path="/profile/"
                                    component={Profile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/profile/:userid"
                                    component={Profile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/share"
                                    component={Share}
                                />
                            </div>
                        </Layout>
                    </Switch>
                </Router>
            </Provider>
        </ApolloProvider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
