import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Logo from '../core/Logo';
import Button from '@/components/core/Button';
import Textfield from '@/components/core/Textfield';
import styles from '@/components/styles/authForm.module.css';

import useCheckAuth from '@/hooks/useCheckAuth';

import { addNotification } from '@/store/features/notificationSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { setCurrentUser } from '@/utils/currentUserUtils';
import { validateRegisterForm } from '@/utils/formUtils';

const initialErrorsState = {
    emailError: '',
    usernameError: '',
    passwordError: '',
    retypedPasswordError: ''
}

const RegisterForm = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const currentUser = useSelector((state: any) => state.currentUser);
    const isLoading = useCheckAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        fullName: '',
        password: '',
        retypedPassword: ''
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
        const validationResult = validateRegisterForm(credentials);
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...validationResult.errors
        }));

        if (validationResult.isValid) {
            try {
                const response = await axios.post(`${process.env.SERVER_URL}/api/register`, credentials, { withCredentials: true });
                if (response.status === 200) {
                    setCurrentUser(response.data.user);
                    router.push('/');
                    dispatch(addNotification({type: 'success', message: "Signed up successfully"}));
                }
            } catch (error: any) {
                if (error.response.status === 409) {
                    if (error.response.data.error === 'duplicate_email') {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            emailError: 'This email is already taken'
                        }));
                    } else if (error.response.data.error === 'duplicate_username') {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            usernameError: 'This username is already taken'
                        }));
                    }
                }
            }
        }
        
    };

    const handleClick = () => {
        router.push('/login');
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
            <form onSubmit={handleSubmit} className={`${styles.registerForm} ${styles.form}`}>
                <Logo className={styles.logo} />
                {/* <Logo className={styles.logoSmall} size="small"/> */}
                <div className={styles.registerInputContainer}>
                    <span className={styles.prompt}>Create new account</span>
                    <Textfield 
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder='Email *'
                        error={errors.emailError}
                    />
                    <Textfield 
                        name='username'
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder='Username *'
                        maxLength={30}
                        error={errors.usernameError}
                    />
                    <Textfield 
                        name='fullName'
                        value={credentials.fullName}
                        onChange={handleChange}
                        placeholder='Full name (optional)'
                        maxLength={30}
                    />
                    <Textfield 
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        type='password'
                        placeholder='Password *'
                        error={errors.passwordError}
                    />
                    <Textfield
                        name='retypedPassword'
                        value={credentials.retypedPassword}
                        onChange={handleChange}
                        type='password'
                        placeholder='Confirm password *'
                        error={errors.retypedPasswordError}
                    />
                    <Button type='submit' text='Create account' color='primary' className={styles.mainButton} />
                    <span className={styles.or}>OR</span>
                    <span className={styles.secondaryButton} onClick={handleClick}>Sign in</span>
                </div>
            </form>
        </div>
        ) : null
    )
}

export default RegisterForm;
