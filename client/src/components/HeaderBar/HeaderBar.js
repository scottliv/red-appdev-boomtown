import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';

import logo from '../../images/boomtown-logo.svg';

const items = [
    <MenuItem key={1} value={1} primaryText="Electronics" />,
    <MenuItem key={2} value={2} primaryText="Household Items" />,
    <MenuItem key={3} value={3} primaryText="Musical Instruments" />,
    <MenuItem key={4} value={4} primaryText="Physical Media" />,
    <MenuItem key={5} value={5} primaryText="Recreational Equipment" />
];

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
            <AppBar
                className="headerBar"
                style={{
                    width: '100vw',
                    left: 0,
                    zIndex: 100,
                    position: 'fixed',
                    backgroundColor: '#fff',
                    alignItems: 'center'
                }}
                iconElementLeft={
                    <div>
                        <Router>
                            <Link to="/">
                                <a href="/">
                                    <img
                                        src={logo}
                                        alt="Boomtown"
                                        className="header-logo"
                                    />
                                </a>
                            </Link>
                        </Router>
                        <SelectField
                            value={this.state.value}
                            onChange={this.handleChange}
                            multiple
                            floatingLabelText="Filter by tag"
                        >
                            {items}
                        </SelectField>
                    </div>
                }
                iconElementRight={
                    <Route>
                        <div>
                            <Link to="/profile">
                                <RaisedButton
                                    style={{ margin: '0 1rem 0 0' }}
                                    label="My Profile"
                                    primary
                                />
                            </Link>
                            <Link to="/login">
                                <RaisedButton
                                    style={{ margin: '0' }}
                                    label="Logout"
                                    secondary
                                />
                            </Link>
                        </div>
                    </Route>
                }
            />
        );
    }
}

// export default HeaderBar;
