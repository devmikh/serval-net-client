import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { clearCurrentUser } from "@/utils/currentUserUtils";

const CurrentUser = (props: any) => {
    const { className } = props;
    const currentUser = useSelector((state: any) => state.currentUser);
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/api/logout`, { withCredentials: true });
            if (response.data.status === 'success') {
                clearCurrentUser();
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