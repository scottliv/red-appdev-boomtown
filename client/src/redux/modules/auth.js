// Actions
const UPDATE_AUTH_STATE = 'UPDATE_AUTH_STATE';
const USER_LOADING = 'USER_LOADING';

// Action Creator
export const updateAuthState = authenticated => ({
    type: UPDATE_AUTH_STATE,
    payload: authenticated
});

export const userLoading = load => ({
    type: USER_LOADING,
    payload: load
});

export default function (
    state = {
        authenticated: 'LOADING_USER',
        userLoading: true
    },
    action
) {
    switch (action.type) {
    case UPDATE_AUTH_STATE: {
        return { ...state, authenticated: action.payload };
    }
    case USER_LOADING: {
        return { ...state, userLoading: action.payload };
    }
    default:
        return state;
    }
}
