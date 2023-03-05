import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {

    const router = useRouter();

    useEffect(() => {
        try {
            fetch('http://localhost:3030/api/protected', { credentials: 'include'})
                .then(res => {
                    if (res.status === 401) {
                        router.push('/login');
                    } else {
                        console.log("User is authorized");
                    }
                });
        } catch(error) {
            console.error(error);
        }
    }, []);

    const handleClick = async () => {
        try {
            const response = await axios.get('http://localhost:3030/api/logout')
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