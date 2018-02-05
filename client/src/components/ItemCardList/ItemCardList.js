import React from 'react';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';
import ItemCard from '../ItemCard';
// import styles from './styles';

const masonryOptions = {
    columnWidth: 33,
    itemSelector: '.item-card'
};

const ItemCardList = ({ items, userLoggedIn, mutate }) => (
    <div className="item-gallery">
        <Masonry elementType="div" options={masonryOptions}>
            {Object.values(items).map(item => (
                <div className="item-card" key={item.id}>
                    <ItemCard
                        key={item.id}
                        item={item}
                        userLoggedIn={userLoggedIn}
                        mutate={mutate}
                    />
                </div>
            ))}
        </Masonry>
    </div>
);

ItemCardList.propTypes = {
    items: PropTypes.object.isRequired,
    userLoggedIn: PropTypes.string.isRequired
};
export default ItemCardList;
