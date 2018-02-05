import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ItemCardList from '../../components/ItemCardList/';
import Loader from '../../components/Loader/';

class ItemsContainer extends Component {
    static propTypes = {};

    filterHelperFunction = (items, filterTags) => {
        const filteredItems = Object.values(items).reduce((itemsAccu, item) => {
            filterTags.forEach(filterTag => {
                if (
                    item.tags &&
                    item.tags
                        .map(tag => Number(tag.id))
                        .indexOf(Number(filterTag)) > -1
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
                mutate={this.props.mutate}
            />
        ) : (
            <ItemCardList
                items={items}
                userLoggedIn={this.props.userLoggedIn}
                mutate={this.props.mutate}
            />
        );
    }
}

const mapStateToProps = state => ({
    userLoggedIn: state.auth.authenticated.uid,
    tags: state.items.tags,
    error: state.items.error
});

ItemsContainer.propTypes = {
    userLoggedIn: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired
};

const updateItemBorrower = gql`
    mutation updateBorrower($id: ID, $borrower: ID) {
        updateItem(updatedItem: { id: $id, borrower: $borrower }) {
            borrower {
                id
            }
        }
    }
`;

const fetchItems = gql`
    query fetchItems {
        items {
            id
            title
            created
            itemowner {
                id
                fullname
                email
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

export default compose(
    withApollo,
    graphql(fetchItems),
    graphql(updateItemBorrower),
    connect(mapStateToProps)
)(ItemsContainer);
