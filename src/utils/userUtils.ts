import Cookies from 'js-cookie';
import { dispatch, getState } from "@/store/store";

/* Set current user */
const setUser = (user: any) => {
    // Set user if user hasn't been set yet
    if (!getState().user.user) {
        dispatch({type: 'user/setUser', payload: user });
    }
};

/* Remove current user info from state and cookie */
const clearUser = () => {
    // Clear state
    dispatch({type: 'user/clearUser'});

    // Clear cookie
    Cookies.remove('user');
};

export {
    clearUser,
    setUser
}