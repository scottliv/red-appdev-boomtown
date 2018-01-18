import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

import store from './redux/store';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';

import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';
import Share from './containers/Share';

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/login" component={Login} />
                    <Layout>
                        <div className="page">
                            <Switch>
                                <Route exact path="/" component={Items} />
                                <Route
                                    exact
                                    path="/profile/"
                                    component={Profile}
                                />
                                <Route
                                    exact
                                    path="/profile/:userID"
                                    component={Profile}
                                />
                                <Route exact path="/share" component={Share} />
                            </Switch>
                        </div>
                    </Layout>
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
