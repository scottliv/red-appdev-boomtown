import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { firebaseAuth } from './../../config/firebaseConfig';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import SelectFilter from '../SelectFilter';

import logo from '../../images/boomtown-logo.svg';

const HeaderBar = ({ authenticated }) => {
    const leftElement = () => (
        <div className="menubar-items-left">
            <Link to="/">
                <img src={logo} alt="Boomtown" className="header-logo" />
            </Link>
            <Route exact path="/" component={SelectFilter} />
        </div>
    );

    const rightElement = () => (
        <Route>
            <div>
                <Link to={`/profile/${authenticated.uid}`}>
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
                        onClick={() => {
                            firebaseAuth
                                .signOut()
                                .then(() => {
                                    // Sign-out successful.
                                })
                                .catch(error => <div> {error.message} </div>);
                        }}
                    />
                </Link>
            </div>
        </Route>
    );
    return (
        <AppBar
            className="headerBar"
            style={{
                width: '100vw',
                left: 0,
                zIndex: 100,
                position: 'fixed',
                backgroundColor: '#fff',
                alignItems: 'center',
                margin: 0
            }}
            iconStyleLeft={{
                padding: 0,
                margin: 0
            }}
            iconElementLeft={leftElement()}
            iconElementRight={rightElement()}
        />
    );
};
const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps)(HeaderBar));
