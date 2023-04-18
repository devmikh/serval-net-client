import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { addNotification } from '@/store/features/notificationSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearCurrentUser } from "@/utils/currentUserUtils";

const CurrentUser = (props: any) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const currentUser = useSelector((state: any) => state.currentUser);
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/api/logout`, { withCredentials: true });
            if (response.data.status === 'success') {
                clearCurrentUser();
                dispatch(addNotification({type: 'success', message: "Signed out successfully"}));
            }
        } catch(error) {
            console.error(error);
        }
    }

    const login = () => {
        router.push('/login');
    }

    if (currentUser.data) {
        return <button onClick={logout} className={className}>Sign Out</button>;
    } else {
        return <button onClick={login} className={className}>Sign In</button>;
    }
}

export default CurrentUser;