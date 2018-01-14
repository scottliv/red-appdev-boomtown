import React from 'react';

import { Route, Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import SelectFilter from '../SelectFilter';

import logo from '../../images/boomtown-logo.svg';

const HeaderBar = () => (
    <AppBar
        className="headerBar"
        style={{
            width: '100vw',
            height: '65px',
            left: 0,
            zIndex: 100,
            position: 'fixed',
            backgroundColor: '#fff',
            alignItems: 'center'
        }}
        iconElementLeft={
            <div className="menubar-items-left">
                <Link to="/">
                    <img src={logo} alt="Boomtown" className="header-logo" />
                </Link>

                <SelectFilter />
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

export default HeaderBar;
