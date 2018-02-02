import React, { Component } from 'react';
import Items from './../Items';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseAuth } from './../../config/firebaseConfig';
// import PropTypes from 'prop-types';

import Login from './Login';

class LoginContainer extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            loginError: { message: '' }
        };
        this.formEmailState = this.formEmailState.bind(this);
        this.formPasswordState = this.formPasswordState.bind(this);
    }

    formEmailState(e) {
        this.setState({ email: e.target.value });
    }
    formPasswordState(e) {
        this.setState({ password: e.target.value });
    }

    login = () => {
        if (this.state.email && this.state.password) {
            firebaseAuth
                .signInWithEmailAndPassword(
                    this.state.email,
                    this.state.password
                )

                .catch(error => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    this.setState({ loginError: error });
                    // ...
                });
        }
    };

    render() {
        if (this.props.authenticated) {
            return <Redirect to={{ pathname: '/' }} />;
        }
        return (
            <Login
                login={this.login}
                formEmailState={this.formEmailState}
                formPasswordState={this.formPasswordState}
                loginError={this.state.loginError}
            />
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(LoginContainer);
