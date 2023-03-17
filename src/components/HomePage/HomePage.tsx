import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useCheckAuth from "@/hooks/useCheckAuth";
import { clearUser } from "@/utils/userUtils";

const HomePage = (props: any) => {

    const user = useSelector((state: any) => state.user);
    const router = useRouter();
    useCheckAuth();
    const handleLogoutClick = async () => {
        try {
            const response = await axios.get('http://localhost:3030/api/logout', { withCredentials: true });
            if (response.data.status === 'success') {
                clearUser();
                router.push('/login');
            }
        } catch(error) {
            console.error(error);
        }
    }
    return (
        <>
            <h1>Home Page (Protected)</h1>
            <h2>Logged in as: {user && user.loading ? 'loading' : (user.user ? user.user.email : null)}</h2>
            <button onClick={() => handleLogoutClick()}>Logout</button>
        </>
    )
}

export default HomePage;