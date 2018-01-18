import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchItemsAndUsers } from '../../redux/modules/items';
import ItemCardList from '../../components/ItemCardList/';
import styles from './styles';

class ItemsContainer extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.dispatch(fetchItemsAndUsers());
    }

    render() {
        if (this.props.isLoading) return <p>Loading</p>;
        return <ItemCardList items={this.props.items} />;
    }
}

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    items: state.items.items,
    error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);
