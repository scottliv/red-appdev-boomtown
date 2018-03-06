import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

import PropTypes from 'prop-types';

import Dialog from '../../components/Dialog';

import { submitBorrow } from '../../redux/modules/borrow';

const updateItemBorrower = gql`
    mutation updateBorrower($id: ID, $borrower: ID) {
        updateItem(updatedItem: { id: $id, borrower: $borrower }) {
            borrower {
                id
            }
        }
    }
`;

const refetchItems = gql`
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

class BorrowedContainer extends React.Component {
    constructor() {
        super();
        this.borrowItem.bind(this);
    }

    borrowItem = async (id, borrower) => {
        await this.props
            .mutate({
                variables: {
                    id,
                    borrower
                },
                refetchQueries: ['fetchItems']
            })
            .then(() => {
                this.props.dispatch(submitBorrow());

                this.props.history.push('/');
            })
            .catch(error => error.message);
    };

    render() {
        return (
            <div>
                <Dialog submitBorrow={this.borrowItem} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showModal: state.borrow.showModal
});

BorrowedContainer.propTypes = {
    showModal: PropTypes.bool
};

export default compose(
    graphql(updateItemBorrower),
    graphql(refetchItems),
    connect(mapStateToProps)
)(withRouter(BorrowedContainer));
