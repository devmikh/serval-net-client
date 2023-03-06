import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';

const withAuth = (Component: any) => {

    const AuthenticatedComponent = () => {

        const router = useRouter();

        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            try {
                axios.get('http://localhost:3030/api/is-authenticated', { withCredentials: true })
                    .then(res => {
                        if (res.status === 200) {
                            setIsAuthenticated(true);
                        }
                    })
                    .catch(err => {
                        if (err.response.status === 401 && err.response.data.authenticated === false) {
                            setIsAuthenticated(false);
                        } else {
                            console.error(err.message);
                        }
                        router.push('/login');
                    });
            } catch(error) {
                console.error(error);
            }
        }, []);

        return isAuthenticated ? <Component /> : null

    };

    return AuthenticatedComponent;
};

export default withAuth;