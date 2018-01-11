import React from 'react';
import Masonry from 'react-masonry-component';
import ItemsContainer from '../../containers/Items/';

const ItemCardList = () => (
    <Masonry>
        {' '}
        <ItemsContainer />{' '}
    </Masonry>
);

export default ItemCardList;
