import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

import './index.css';
import muiTheme from './config/theme';

import Layout from './components/Layout';
import HeaderBar from './components/HeaderBar';
import Login from './containers/Login';
import Items from './containers/Items';
import Profile from './containers/Profile';
import Share from './containers/Share';

const Boomtown = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Layout>
            <div>
                <Router>
                    <div>
                        <Link to="/items">Items</Link>{' '}
                        <Switch>
                            <Route exact path="/" component={Items} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/share" component={Share} />
                        </Switch>
                    </div>
                </Router>
            </div>
        </Layout>
    </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById('root'));
registerServiceWorker();
