import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderBar from '../../components/HeaderBar';

import './styles.css';

const Layout = ({ children, userLoading, authenticated }) =>
    (userLoading ? (
        <div>Loading</div>
    ) : (
        <div className="appContentWrapper">
            <div className="appHeader">{authenticated && <HeaderBar />}</div>
            <div className="appContent">{children}</div>
            {/* And a footer here, but not on the login route... */}
        </div>
    ));

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
    userLoading: state.auth.userLoading
});

export default withRouter(connect(mapStateToProps)(Layout));
