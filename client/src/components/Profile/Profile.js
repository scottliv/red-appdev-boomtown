import React from 'react';
import PropTypes from 'prop-types';
import ItemCardList from '../ItemCardList';
import ProfileCard from './ProfileCard';

const Profile = ({ items, userLoggedIn, currentUser, borrowed }) => (
    <div className="item-gallery">
        <ProfileCard
            items={items}
            userLoggedIn={userLoggedIn}
            currentUser={currentUser}
            borrowed={borrowed}
        />
        <ItemCardList
            items={items}
            userLoggedIn={userLoggedIn}
            currentUser={currentUser}
        />
    </div>
);

Profile.propTypes = {
    items: PropTypes.object.isRequired
};
export default Profile;
