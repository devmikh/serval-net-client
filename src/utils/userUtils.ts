import store from "@/store/store";
import Cookies from 'js-cookie';

// Remove current user info from state and cookie
const clearUser = () => {
    // Clear state
    store.dispatch({type: 'user/clearUser'});

    // Clear cookie
    Cookies.remove('user');
};

export {
    clearUser
}