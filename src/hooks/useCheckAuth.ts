import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Checks if user is already authenticated. Prevents user from going to /login or /register if already authenticated
const useCheckAuth = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            axios.get('http://localhost:3030/api/is-authenticated', { withCredentials: true })
                .then(res => {
                    if (res.status === 200 && res.data.authenticated === true) {
                        console.log("User is already authenticated");
                        router.push('/');
                    }
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        console.log("Error 401");
                    } else {
                        console.log(err.message);
                    }
                    setIsLoading(false);
                });
        } catch(error) {
            console.error(error);
        }
    }, []);

    return isLoading;
};

export default useCheckAuth;