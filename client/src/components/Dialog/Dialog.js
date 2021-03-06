import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/modules/borrow';

const BorrowModal = ({
    borrowerId,
    isModalOpen,
    itemId,
    itemName,
    setModalShowStateTo,
    submitBorrow,
    actionType
}) => (
    <div>
        <Dialog
            title={actionType}
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
                        submitBorrow(itemId, borrowerId);
                    }}
                />
            ]}
            modal={false}
            open={isModalOpen}
            onRequestClose={setModalShowStateTo(false)}
        >
            Do You Really Want To {actionType} This {itemName}?
        </Dialog>
    </div>
);

const mapStateToProps = state => ({
    isModalOpen: state.borrow.showModal,
    itemName: state.borrow.itemName,
    itemId: state.borrow.itemId,
    borrowerId: state.borrow.borrowerId,
    actionType: state.borrow.actionType
});

const mapDispatchToProps = dispatch => ({
    setModalShowStateTo(onOrOff) {
        return () => {
            dispatch(toggleModal(onOrOff));
        };
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BorrowModal);
