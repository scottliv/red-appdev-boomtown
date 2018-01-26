// ACTIONS

// const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
// const GET_ITEMS = 'GET_ITEMS';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

const FILTER_ITEMS = 'FILTER_ITEMS';

// Action Creators

// const getItemsLoading = () => ({ type: GET_ITEMS_LOADING });
// const getItems = items => ({ type: GET_ITEMS, payload: items });
const getItemsError = error => ({
    type: GET_ITEMS_ERROR,
    payload: error
});

export const filterItems = tags => ({
    type: FILTER_ITEMS,
    payload: tags
});

// Async Action
// export const fetchItemsAndUsers = () => dispatch => {
//     dispatch(getItemsLoading());

//     const ITEMS_URL = 'http://localhost:4000/items';
//     const USERS_URL = 'http://localhost:4000/users';

//     const items = fetch(ITEMS_URL).then(r => r.json());
//     const users = fetch(USERS_URL).then(r => r.json());

//     return Promise.all([items, users])
//         .then(response => {
//             const [itemsList, userList] = response;
//             const userTable = userList.reduce((userAccu, user) => {
//                 userAccu[user.id] = user;
//                 return userAccu;
//             }, {});

//             const combinedItems = itemsList.reduce((itemAccu, item) => {
//                 const itemOwner = item.itemowner;
//                 const itemBorrower = item.borrower;
//                 itemAccu[item.id] = item;

//                 if (itemAccu[item.id].itemowner === userTable[itemOwner].id) {
//                     itemAccu[item.id].itemowner = userTable[itemOwner];
//                 }

//                 if (
//                     itemAccu[item.id].borrower &&
//                     itemAccu[item.id].borrower === userTable[itemBorrower].id
//                 ) {
//                     itemAccu[item.id].borrower = userTable[itemBorrower];
//                 }
//                 return itemAccu;
//             }, {});
//             dispatch(getItems(combinedItems));
//         })
//         .catch(error => dispatch(getItemsError(error.message)));
// };

// Reducer

export default (
    state = {
        // isLoading: false,
        userLoggedIn: 'eEvh1WUF5nb5eeUksUQb3Ph0kOU2',
        // items: {},
        tags: [],
        error: ''
    },
    action
) => {
    switch (action.type) {
    // case GET_ITEMS_LOADING: {
    //     return { ...state, isLoading: true, error: '' };
    // }
    // case GET_ITEMS: {
    //     return {
    //         ...state,
    //         isLoading: false,
    //         items: action.payload,
    //         error: ''
    //     };
    // }
    case GET_ITEMS_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }

    case FILTER_ITEMS: {
        return {
            ...state,
            tags: action.payload,
            isLoading: false
        };
    }
    default:
        return state;
    }
};
