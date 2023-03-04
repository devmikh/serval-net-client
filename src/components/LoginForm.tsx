import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
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
        <form onSubmit={handleSubmit}>
            <TextField
                name='email'
                value={credentials.email}
                label='Email'
                onChange={handleChange} />
            <TextField
                name='password'
                type='password'
                value={credentials.password}
                label='Password'
                onChange={handleChange}
                autoComplete ='new-password'
            />
            <Button type='submit' variant='contained'>Login</Button>
        </form>
    )
}

export default RegisterForm;