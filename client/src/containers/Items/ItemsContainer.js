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

    filterHelperFunction = (items, filterTags) => {
        const filteredItems = Object.values(items).reduce((itemsAccu, item) => {
            filterTags.forEach(filterTag => {
                if (item.tags && item.tags.indexOf(filterTag) > -1) {
                    itemsAccu[item.id] = item;
                }
            });

            return itemsAccu;
        }, {});
        return filteredItems;
    };

    render() {
        if (this.props.isLoading) return <Loader />;
        return this.props.tags && Object.keys(this.props.tags).length ? (
            <ItemCardList
                userLoggedIn={this.props.userLoggedIn}
                items={this.filterHelperFunction(
                    this.props.items,
                    this.props.tags
                )}
            />
        ) : (
            <ItemCardList items={this.props.items} />
        );
    }
}

const mapStateToProps = state => ({
    userLoggedIn: state.profile.userLoggedIn,
    isLoading: state.items.isLoading,
    items: state.items.items,
    tags: state.items.tags,
    error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);
