import Cookies from 'js-cookie';
import { dispatch, getState } from "@/store/store";

/* Set current user */
const setCurrentUser = (user: any) => {
    // Set user if user hasn't been set yet
    if (!getState().currentUser.data) {
        dispatch({type: 'currentUser/setCurrentUser', payload: user });
    }
};

/* Remove current user info from state and cookie */
const clearCurrentUser = () => {
    // Clear state
    dispatch({type: 'currentUser/clearCurrentUser'});

    // Clear cookie
    Cookies.remove('user');
};

export {
    clearCurrentUser,
    setCurrentUser
}
