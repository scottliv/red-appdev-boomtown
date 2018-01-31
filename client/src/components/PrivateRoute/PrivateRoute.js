import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({ authenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (authenticated ? <Component {...props} /> : <Redirect to="/login" />)
        }
    />
);

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps)(privateRoute);
