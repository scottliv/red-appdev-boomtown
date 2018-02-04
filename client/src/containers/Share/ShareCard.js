import React from 'react';
import ItemCard from './../../components/ItemCard/';

const ShareCard = ({ item }) => (
    <div className="item-card">
        <ItemCard item={item} />
    </div>
);

export default ShareCard;
