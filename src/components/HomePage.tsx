import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {

    const router = useRouter();

    useEffect(() => {
        try {
            axios.get('http://localhost:3030/api/is-authenticated', { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        console.log("User is authenticated");
                    }
                })
                .catch(err => {
                    if (err.response.status === 401 && err.response.data.authenticated === false) {
                        console.log("Error 401")
                    } else {
                        console.log(err.message);
                    }
                    router.push('/login');
                });
        } catch(error) {
            console.error(error);
        }
    }, []);

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