import React from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
        <Link to="/share">
            <FloatingActionButton
                secondary
                style={{ position: 'fixed', bottom: '15px', right: '15px' }}
            >
                <ContentAdd />
            </FloatingActionButton>
        </Link>
    </div>
);

ItemCardList.propTypes = {
    items: PropTypes.object.isRequired,
    userLoggedIn: PropTypes.string.isRequired
};
export default ItemCardList;
