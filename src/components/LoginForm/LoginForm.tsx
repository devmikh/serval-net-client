import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from './LoginForm.module.css';
import Button from '../core/Button/Button';
import Textfield from '../core/Textfield/Textfield';
import atIcon from '../../../public/images/at-solid.svg';
import keyIcon from '../../../public/images/key-solid.svg';
import logo from '../../../public/images/serval-logo.svg';

const LoginForm = () => {

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
        !isAuthenticated ? (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginform}>
                <Image src={logo} alt='logo' height='100' width='100' />
                <h1 className={styles.h1}>Login</h1>
                <Textfield
                    name='email'
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"
                    icon={atIcon}
                />
                <Textfield
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    type='password'
                    placeholder="Password"
                    icon={keyIcon}
                />
                <Button type='submit' text='Login' color='primary' />
                <Link href="/register" className={styles.link}>create new account</Link>
                {/* Workaround to disable autocompletion of the form */}
                <input autoComplete="on" style={{ display: 'none' }}
                    id="fake-hidden-input-to-disable autocomplete"></input>
            </form>
        </div>
        ) : null
    )
}

export default LoginForm;