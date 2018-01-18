import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';
import ItemCard from '../../components/ItemCard';
// import styles from './styles';
import styles from './styles.css';
import ItemCardList from './ItemCardList';

const masonryOptions = {
    columnWidth: 33,
    itemSelector: '.item-card'
};

const Items = ({ items }) => (
    <div style={styles.itemGallery} className="item-gallery">
        <Masonry
            style={styles.itemGallery}
            elementType="ul"
            options={masonryOptions}
        >
            {Object.values(items).map(item => (
                <div
                    className="item-card"
                    key={item.id}
                    style={styles.itemCard}
                >
                    <ItemCard key={item.id} item={item} />
                </div>
            ))}
        </Masonry>
    </div>
);

Items.propTypes = {
    items: PropTypes.object.isRequired
};
export default ItemCardList;