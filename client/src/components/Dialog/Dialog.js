import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/modules/borrow';
import { firebaseAuth } from '../../config/firebaseConfig';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const BorrowModal = ({
    isModalOpen,
    itemId,
    itemName,
    setModalShowStateTo,
    submitBorrow
}) => (
    <div>
        <Dialog
            title="Dialog With Actions"
            actions={[
                <FlatButton
                    label="Cancel"
                    primary
                    onClick={setModalShowStateTo(false)}
                />,
                <FlatButton
                    label="Submit"
                    primary
                    keyboardFocused
                    onClick={() => {
                        submitBorrow(itemId, `${firebaseAuth.currentUser.uid}`);
                    }}
                />
            ]}
            modal={false}
            open={isModalOpen}
            onRequestClose={setModalShowStateTo(false)}
        >
            Do you really want to borrow this {itemName}?
        </Dialog>
    </div>
);

const mapStateToProps = state => ({
    isModalOpen: state.borrow.showModal,
    itemName: state.borrow.itemName,
    itemId: state.borrow.itemId
});

const mapDispatchToProps = dispatch => ({
    setModalShowStateTo(onOrOff) {
        return () => {
            dispatch(toggleModal(onOrOff));
        };
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BorrowModal);
