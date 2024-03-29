import axios from 'axios';
import { useState, useEffect } from 'react';
import { setCurrentUser } from '@/utils/currentUserUtils';

// Checks if user is authenticated
const useCheckAuth = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            axios.get(`${process.env.SERVER_URL}/api/is-authenticated`, { withCredentials: true })
                .then(res => {
                    if (res.data.authenticated === true) {
                        setCurrentUser(res.data.user);
                    } else {
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    console.error(error.message);
                });
        } catch(error: any) {
            console.error(error.message);
        }
    }, []);

    return isLoading;
};

export default useCheckAuth;
