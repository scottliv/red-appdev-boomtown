// ACTIONS

const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
const GET_PROFILE = 'GET_PROFILE';
const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

// Action Creators

const getProfileLoading = () => ({ type: GET_PROFILE_LOADING });
const getProfile = (items, userid, currentUser, borrowed) => ({
    type: GET_PROFILE,
    payload: { items, userid, currentUser, borrowed }
});
const getProfileError = error => ({
    type: GET_PROFILE_ERROR,
    payload: error
});
// Async Action
export const fetchProfile = userid => dispatch => {
    dispatch(getProfileLoading());

    const ITEMS_URL = `http://localhost:4000/items/?itemowner=${userid}`;
    const USERS_URL = 'http://localhost:4000/users';
    const BORROWED_URL = `http://localhost:4000/items/?borrower=${userid}`;

    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());
    const borrowed = fetch(BORROWED_URL).then(r => r.json());

    return Promise.all([items, users, borrowed])
        .then(response => {
            // Turn user array into an object
            const [itemsList, userList] = response;
            const userTable = userList.reduce((userAccu, user) => {
                userAccu[user.id] = user;
                return userAccu;
            }, {});

            const currentUser = userTable[userid];

            // extract user data and item data into single objects
            const combinedItems = itemsList.reduce((combinedItemAccu, item) => {
                const user = userid;
                const itemOwner = item.itemowner;
                const itemBorrower = item.borrower;
                if (user === item.itemowner) {
                    combinedItemAccu[item.id] = item;

                    if (
                        combinedItemAccu[item.id].itemowner ===
                        userTable[itemOwner].id
                    ) {
                        combinedItemAccu[item.id].itemowner =
                            userTable[itemOwner];
                    }

                    if (
                        combinedItemAccu[item.id].borrower &&
                        combinedItemAccu[item.id].borrower ===
                            userTable[itemBorrower].id
                    ) {
                        combinedItemAccu[item.id].borrower =
                            userTable[itemBorrower];
                    }
                }
                return combinedItemAccu;
            }, {});
            dispatch(getProfile(combinedItems, userid, currentUser, borrowed));
        })
        .catch(error => dispatch(getProfileError(error.message)));
};

// Reducer

export default (
    state = {
        isLoading: false,
        items: {},
        borrowed: [],
        userLoggedIn: 'eEvh1WUF5nb5eeUksUQb3Ph0kOU2',
        userid: '',
        currentUser: {},
        error: ''
    },
    action
) => {
    switch (action.type) {
    case GET_PROFILE_LOADING: {
        return { ...state, isLoading: true, error: '' };
    }
    case GET_PROFILE: {
        return {
            ...state,
            isLoading: false,
            borrowed: action.payload.borrowed,
            userid: action.payload.userid,
            currentUser: action.payload.currentUser,
            items: action.payload.items,
            error: ''
        };
    }
    case GET_PROFILE_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    default:
        return state;
    }
};
