import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';

import { fetchProfile } from '../../redux/modules/profile';

class ProfileContainer extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.match.params.userid
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchProfile(this.state.userid));
    }
    render() {
        if (this.props.isLoading) return <p>Loading</p>;
        return (
            <Profile
                items={this.props.items}
                currentUser={this.props.userid}
                borrowed={this.props.borrowed}
            />
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.profile.isLoading,
    items: state.profile.items,
    borrowed: state.profile.borrowed,
    userid: state.userid,
    error: state.profile.error
});

export default connect(mapStateToProps)(ProfileContainer);
