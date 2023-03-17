import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';

const withAuth = (Component: any) => {

    const AuthenticatedComponent = () => {
        const router = useRouter();
        const [isAuthorized, setIsAuthorized] = useState(false);
        useEffect(() => {
            try {
                axios.get('http://localhost:3030/api/is-authorized', { withCredentials: true })
                    .then(res => {
                        if (res.status === 200 && res.data.authorized === true) {
                            setIsAuthorized(true);
                        }
                    })
                    .catch(err => {
                        if (err.response.status === 401 && err.response.data.authorized === false) {
                            setIsAuthorized(false);
                        } else {
                            console.error(err.message);
                        }
                        router.push('/login');
                    });
            } catch(error) {
                console.error(error);
            }
        }, []);

        return isAuthorized ? <Component /> : null
    };

    return AuthenticatedComponent;
};

export default withAuth;