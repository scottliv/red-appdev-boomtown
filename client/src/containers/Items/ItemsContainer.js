import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { toggleModal, setItemInfo } from '../../redux/modules/borrow';
import Borrowed from '../Borrowed';
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

    toggleModal = itemInfo => {
        this.props.dispatch(setItemInfo(itemInfo));
        this.props.dispatch(toggleModal(true));
    };

    render() {
        console.log(this.props);
        const { loading, items, showModal } = this.props.data;
        if (loading) return <Loader />;
        return this.props.tags && Object.keys(this.props.tags).length ? (
            <div>
                <Borrowed />
                <ItemCardList
                    userLoggedIn={this.props.userLoggedIn}
                    items={this.filterHelperFunction(items, this.props.tags)}
                    toggle={this.toggleModal}
                />
            </div>
        ) : (
            <div>
                <Borrowed />
                <ItemCardList
                    items={items}
                    userLoggedIn={this.props.userLoggedIn}
                    fetchItems={this.props.client.query}
                    toggle={this.toggleModal}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userLoggedIn: state.auth.authenticated.uid,
    tags: state.items.tags,
    error: state.items.error,
    showModal: state.items.showModal
});

ItemsContainer.propTypes = {
    userLoggedIn: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    showModal: PropTypes.bool
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
