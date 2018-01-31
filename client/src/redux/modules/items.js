// ACTIONS

const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

const FILTER_ITEMS = 'FILTER_ITEMS';

// Action Creators

const getItemsError = error => ({
    type: GET_ITEMS_ERROR,
    payload: error
});

export const filterItems = tags => ({
    type: FILTER_ITEMS,
    payload: tags
});

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
