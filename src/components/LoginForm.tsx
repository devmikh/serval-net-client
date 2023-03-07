import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Textfield from './elements/Textfield';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const RegisterForm = () => {

    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        try {
            axios.get('http://localhost:3030/api/is-authenticated', { withCredentials: true })
                .then(res => {
                    if (res.status === 200 && res.data.authenticated === true) {
                        console.log("User is already authenticated");
                        setIsAuthenticated(true);
                        router.push('/');
                    }
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        setIsAuthenticated(false);
                        console.log("Error 401");
                    } else {
                        console.log(err.message);
                    }
                    router.push('/login');
                });
        } catch(error) {
            console.error(error);
        }
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/api/login', credentials, {withCredentials: true});
            if (response.data.status === 'success') {
                router.push('/');
            } else {
                console.log('User login error');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event?.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    return (
        !isAuthenticated ? (<form onSubmit={handleSubmit}>
            <Textfield
                name='email'
                value={credentials.email}
                onChange={handleChange}
                placeholder="Email"/>
            <Textfield
                name='password'
                type='password'
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
            />
            <Button type='submit' variant='contained'>Login</Button>

            {/* Workaround to disable autocompletion of the form */}
            <input autoComplete="on" style={{ display: 'none' }}
                id="fake-hidden-input-to-disable autocomplete"></input>
        </form>) : null
    )
}

export default RegisterForm;