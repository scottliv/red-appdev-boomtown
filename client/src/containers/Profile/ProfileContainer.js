import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../../components/Profile';

import { fetchProfile } from '../../redux/modules/profile';

class ProfileContainer extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.dispatch(fetchProfile(this.props.match.params.userid));
    }
    render() {
        if (this.props.isLoading) return <p>Loading</p>;
        return (
            <Profile
                items={this.props.items}
                userLoggedIn={this.props.userLoggedIn}
                currentUser={this.props.currentUser}
                borrowed={this.props.borrowed}
            />
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.profile.isLoading,
    items: state.profile.items,
    borrowed: state.profile.borrowed,
    userid: state.profile.userid,
    userLoggedIn: state.profile.userLoggedIn,
    currentUser: state.profile.currentUser,
    error: state.profile.error
});

export default connect(mapStateToProps)(ProfileContainer);
