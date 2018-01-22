import React, { Component } from 'react';
// import ItemCardList from '../../components/Items';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';
import ItemCardList from '../ItemCardList';
import ProfileCard from './ProfileCard';
// import styles from './styles';
import styles from './styles.css';

const masonryOptions = {
    columnWidth: 33,
    itemSelector: '.item-card'
};

const Profile = ({ items, currentUser, borrowed }) => (
    <div className="item-gallery">
        <ProfileCard
            items={items}
            currentUser={currentUser}
            borrowed={borrowed}
        />
        <ItemCardList items={items} />
    </div>
);

Profile.propTypes = {
    items: PropTypes.object.isRequired
};
export default Profile;
