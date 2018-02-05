import React, { Component } from 'react';
import { connect } from 'react-redux';

import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Profile from '../../components/Profile';

class ProfileContainer extends Component {
    static propTypes = {};

    render() {
        const { loading, user } = this.props.data;
        console.log(this.props);
        if (loading) return <p> Loading </p>;
        return (
            <Profile
                items={user.shareditems}
                userLoggedIn={this.props.userLoggedIn}
                currentUser={user}
                borrowed={this.props.borrowed}
            />
        );
    }
}

const mapStateToProps = state => ({
    borrowed: state.profile.borrowed,
    userid: state.profile.userid,
    userLoggedIn: state.auth.authenticated.uid,
    currentUser: state.profile.currentUser,
    error: state.profile.error
});

const getProfile = gql`
    query getUserProfile($ID: ID) {
        user(id: $ID) {
            id
            bio
            fullname
            email
            shareditems {
                id
                title
                imageurl
                description
                tags {
                    id
                    title
                }
                itemowner {
                    id
                    fullname
                    bio
                    email
                }
            }
        }
    }
`;

export default compose(
    withApollo,
    graphql(getProfile, {
        options: ownProps => ({
            variables: {
                ID: ownProps.match.params.userid
            }
        })
    }),
    connect(mapStateToProps)
)(ProfileContainer);
