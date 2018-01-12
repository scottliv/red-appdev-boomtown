import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';
import ItemCard from '../../components/ItemCard';
import styles from './styles.js';

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
            {items
                ? items.map(item => (
                    <li className="item-card" style={styles.itemCard}>
                        <ItemCard key={item.id} item={item} />
                    </li>
                ))
                : ''}
        </Masonry>
    </div>
);

Items.propTypes = {
    items: PropTypes.array.isRequired
};
export default Items;
