import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = (props: any) => {

    const router = useRouter();

    const handleClick = async () => {
        try {
            const response = await axios.get('http://localhost:3030/api/logout', { withCredentials: true })
            if (response.data.status === 'success') {
                router.push('/login');
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1>Home Page (Protected)</h1>
            <button onClick={() => handleClick()}>Logout</button>
        </>
    )
}

export default HomePage;