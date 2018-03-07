const TOGGLE_MODAL = 'TOGGLE_MODAL';
const MODAL_ERROR = 'MODAL_ERROR';
const SUBMIT_BORROW = 'SUBMIT_BORROW';
const SET_ITEM_INFO = 'SET_ITEM_INFO';

export const toggleModal = bool => ({
    type: TOGGLE_MODAL,
    payload: bool
});

export const setItemInfo = itemInfo => ({
    type: SET_ITEM_INFO,
    payload: itemInfo
});

export const submitBorrow = () => ({
    type: SUBMIT_BORROW
});

export default (
    state = {
        showModal: false,
        error: '',
        itemId: '',
        itemName: '',
        actionType: ''
    },
    action
) => {
    switch (action.type) {
    case SUBMIT_BORROW: {
        return {
            ...state,
            showModal: false,
            itemId: '',
            itemName: '',
            borrowerId: ''
        };
    }
    case SET_ITEM_INFO: {
        return {
            ...state,
            itemId: action.payload.itemId,
            itemName: action.payload.itemName,
            borrowerId: action.payload.borrowerId,
            actionType: action.payload.actionType
        };
    }
    case TOGGLE_MODAL: {
        return {
            ...state,
            showModal: action.payload
        };
    }
    default:
        return state;
    }
};
