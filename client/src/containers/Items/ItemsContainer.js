import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchItemsAndUsers } from '../../redux/modules/items';
import ItemCardList from '../../components/ItemCardList/';
import Loader from '../../components/Loader/';
import styles from './styles';

class ItemsContainer extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.dispatch(fetchItemsAndUsers());
    }

    render() {
        console.log(this.props);
        if (this.props.isLoading) return <Loader />;
        return this.props.filtered &&
            Object.keys(this.props.filtered).length ? (
                <ItemCardList items={this.props.filtered} />
            ) : (
                <ItemCardList items={this.props.items} />
            );
    }
}

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    items: state.items.items,
    filtered: state.items.filteredItems,
    error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);
