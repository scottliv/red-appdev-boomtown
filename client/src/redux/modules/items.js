// ACTIONS

const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS = 'GET_ITEMS';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

const FILTER_ITEMS = 'FILTER_ITEMS';

// Action Creators

const getItemsLoading = () => ({ type: GET_ITEMS_LOADING });
const getItems = items => ({ type: GET_ITEMS, payload: items });
const getItemsError = error => ({
    type: GET_ITEMS_ERROR,
    payload: error
});

export const filterItems = (items, tags) => ({
    type: FILTER_ITEMS,
    payload: { items, tags }
});

// Helper Function

const filterHelperFunction = (items, filterTags) => {
    const filteredItems = Object.values(items).reduce((itemsAccu, item) => {
        filterTags.forEach(filterTag => {
            console.log(filterTag);
            console.log(item);
            if (item.tags && item.tags.indexOf(filterTag) > -1) {
                itemsAccu[item.id] = item;
            }
        });

        return itemsAccu;
    }, {});
    return filteredItems;
};

// Async Action
export const fetchItemsAndUsers = () => dispatch => {
    dispatch(getItemsLoading());

    const ITEMS_URL = 'http://localhost:4000/items';
    const USERS_URL = 'http://localhost:4000/users';

    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());

    return Promise.all([items, users])
        .then(response => {
            const [itemsList, userList] = response;
            const userTable = userList.reduce((obj, user) => {
                obj[user.id] = user;
                return obj;
            }, {});

            const combinedItems = itemsList.reduce((obj, item) => {
                const itemOwner = item.itemowner;
                const itemBorrower = item.borrower;
                obj[item.id] = item;

                if (obj[item.id].itemowner === userTable[itemOwner].id) {
                    obj[item.id].itemowner = userTable[itemOwner];
                }

                if (
                    obj[item.id].borrower &&
                    obj[item.id].borrower === userTable[itemBorrower].id
                ) {
                    obj[item.id].borrower = userTable[itemBorrower];
                }
                return obj;
            }, {});
            dispatch(getItems(combinedItems));
        })
        .catch(error => dispatch(getItemsError(error.message)));
};

// Reducer

export default (
    state = {
        isLoading: false,
        items: {},
        filteredItems: {},
        error: ''
    },
    action
) => {
    switch (action.type) {
    case GET_ITEMS_LOADING: {
        return { ...state, isLoading: true, error: '' };
    }
    case GET_ITEMS: {
        return {
            ...state,
            isLoading: false,
            items: action.payload,
            error: ''
        };
    }
    case GET_ITEMS_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }

    case FILTER_ITEMS: {
        const filtered = filterHelperFunction(
            action.payload.items,
            action.payload.tags
        );
        return {
            ...state,
            filteredItems: filtered,
            isLoading: false
        };
    }
    default:
        return state;
    }
};
