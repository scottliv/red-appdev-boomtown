import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
    tags: state.items.tags,
    error: state.items.error
});

ItemsContainer.propTypes = {
    userLoggedIn: PropTypes.string.isRequired,
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

export default graphql(fetchItems)(connect(mapStateToProps)(ItemsContainer));
// export connect(mapStateToProps)(ItemsContainer);
