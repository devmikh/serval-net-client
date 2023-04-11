import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Logo from '../core/Logo';
import Button from '@/components/core/Button';
import Textfield from '@/components/core/Textfield';
import styles from '@/components/styles/authForm.module.css';

import useCheckAuth from '@/hooks/useCheckAuth';

import { setCurrentUser } from '@/utils/currentUserUtils';
import { validateLoginForm } from '@/utils/formUtils';

const initialErrorsState = {
    emailError: '',
    passwordError: ''
}

const Login = () => {

    const router = useRouter();
    const currentUser = useSelector((state: any) => state.currentUser);
    const isLoading = useCheckAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState(initialErrorsState);
    
    // Redirect user if already authenticated
    useEffect(() => {
        if (currentUser.data) {
            router.push('/');
        }
    }, [currentUser]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        // Validate form before sending it to backend
        const validationResult = validateLoginForm(credentials);
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...validationResult.errors
        }));

        if (validationResult.isValid) {
            try {
                const response = await axios.post(`${process.env.SERVER_URL}/api/login`, credentials, {withCredentials: true});
                if (response.status === 200) {
                    setCurrentUser(response.data.user);
                    router.push('/');
                }
            } catch (error: any) {
                if (error.response.status === 401) {
                    if (error.response.data.error === 'invalid_credentials') {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            passwordError: 'Your email and password do not match'
                        }));
                    }
                } else {
                    console.error(error);
                }
                
            }
        }
        
    };

    const handleClick = () => {
        router.push('/register');
    }

    const handleChange = (event: any) => {
        setErrors(initialErrorsState);
        const { name, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    return (
        !isLoading ? (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2 className={styles.welcomePrompt}>Welcome to</h2>
                <Logo />
                <span className={styles.prompt}>Have an account?</span>
                <div className={styles.textfieldsContainer}>
                    <Textfield
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder='Email'
                        error={errors.emailError}
                    />
                    <Textfield
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        type='password'
                        placeholder='Password'
                        error={errors.passwordError}
                    />
                </div>
                
                <Button type='submit' text='Sign in' color='primary' className={styles.mainButton} />
                <span>OR</span>
                <span className={styles.secondaryButton} onClick={handleClick}>Create account</span>

                
                {/* <Link href="/register" className={styles.link}>create new account</Link> */}
                {/* Workaround to disable autocompletion of the form */}
                <input autoComplete="on" style={{ display: 'none' }}
                    id="fake-hidden-input-to-disable autocomplete"></input>
            </form>
        </div>
        ) : null
    )
}

export default Login;
