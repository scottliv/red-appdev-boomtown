import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fetchItemsAndUsers } from '../../redux/modules/items';
import ItemCardList from '../../components/ItemCardList/';
import Loader from '../../components/Loader/';

class ItemsContainer extends Component {
    static propTypes = {};

    // componentDidMount() {
    //     this.props.dispatch(fetchItemsAndUsers());
    // }

    filterHelperFunction = (items, filterTags) => {
        const filteredItems = Object.values(items).reduce((itemsAccu, item) => {
            filterTags.forEach(filterTag => {
                if (
                    item.tags &&
                    item.tags.map(tag => tag.title).indexOf(filterTag) > -1
                ) {
                    itemsAccu[item.id] = item;
                }
            });

            return itemsAccu;
        }, {});
        return filteredItems;
    };

    render() {
        const { loading, items } = this.props.data;
        if (loading) return <Loader />;
        return this.props.tags && Object.keys(this.props.tags).length ? (
            <ItemCardList
                userLoggedIn={this.props.userLoggedIn}
                items={this.filterHelperFunction(items, this.props.tags)}
            />
        ) : (
            <ItemCardList
                items={items}
                // userLoggedIn={this.props.userLoggedIn}
            />
        );
    }
}

const mapStateToProps = state => ({
    userLoggedIn: state.items.userLoggedIn,
    isLoading: state.items.isLoading,
    items: state.items.items,
    tags: state.items.tags,
    error: state.items.error
});

ItemsContainer.propTypes = {
    items: PropTypes.object.isRequired,
    userLoggedIn: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    tags: PropTypes.array.isRequired
};

const fetchItems = gql`
    query fetchItems {
        items {
            id
            title
            itemowner {
                id
            }
            tags {
                id
                title
            }
            borrower {
                id
            }
            imageurl
            description
            available
        }
    }
`;

export default graphql(fetchItems)(ItemsContainer);
// export connect(mapStateToProps)(ItemsContainer);
