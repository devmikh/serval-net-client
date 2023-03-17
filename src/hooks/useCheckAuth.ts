import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/store/store';
import axios from 'axios';

// Checks if user is already authenticated. Prevents user from going to /login or /register if already authenticated
const useCheckAuth = () => {

    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            axios.get('http://localhost:3030/api/is-authenticated', { withCredentials: true })
                .then(res => {
                    if (res.data.authenticated === true) {
                        dispatch({type: 'user/setUser', payload: res.data.user });
                        router.push('/');
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