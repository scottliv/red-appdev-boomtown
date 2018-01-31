// Actions
const UPDATE_AUTH_STATE = 'UPDATE_AUTH_STATE';

// Action Creator
export const updateAuthState = authenticated => ({
    type: UPDATE_AUTH_STATE,
    payload: authenticated
});

export default function (
    state = {
        authenticated: false
    },
    action
) {
    switch (action.type) {
    case UPDATE_AUTH_STATE: {
        return { authenticated: action.payload };
    }

    default:
        return state;
    }
}
