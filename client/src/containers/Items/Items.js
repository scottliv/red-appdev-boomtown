import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../../components/ItemCard';

const Items = ({ items }) => (
    <div>
        {items ? items.map(item => <ItemCard key={item.id} item={item} />) : ''}
    </div>
);

Items.propTypes = {
    items: PropTypes.array.isRequired
};
export default Items;
