import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useCheckAuth from "@/hooks/useCheckAuth";
import { clearCurrentUser } from "@/utils/currentUserUtils";

const Home = (props: any) => {

    const currentUser = useSelector((state: any) => state.currentUser);
    const router = useRouter();
    useCheckAuth();
    const handleLogoutClick = async () => {
        try {
            const response = await axios.get('http://localhost:3030/api/logout', { withCredentials: true });
            if (response.data.status === 'success') {
                clearCurrentUser();
                router.push('/login');
            }
        } catch(error) {
            console.error(error);
        }
    }
    return (
        <>
            <h1>Home Page (Protected)</h1>
            <h2>Logged in as: {(currentUser.data ? currentUser.data.username : null)}</h2>
            <button onClick={() => handleLogoutClick()}>Logout</button>
        </>
    )
}

export default Home;
