import axios from "axios";
import { useRouter } from "next/router";
import Image from 'next/image'
import { useEffect } from "react";

import { fetchUser } from "@/store/features/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const HomePage = (props: any) => {

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    const handleLogoutClick = async () => {
        try {
            const response = await axios.get('http://localhost:3030/api/logout', { withCredentials: true })
            if (response.data.status === 'success') {
                router.push('/login');
            }
        } catch(error) {
            console.error(error);
        }
    }

    const handleTestClick = async () => {
        dispatch(fetchUser());
    };

    return (
        <>
            <h1>Home Page (Protected)</h1>
            <button onClick={() => handleLogoutClick()}>Logout</button>
            <button onClick={() => handleTestClick()}>Test</button>
        </>
    )
}

export default HomePage;