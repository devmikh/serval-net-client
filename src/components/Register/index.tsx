import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from '@/components/core/Button';
import Textfield from '@/components/core/Textfield';
import styles from '@/components/styles/authForm.module.css';

import useCheckAuth from '@/hooks/useCheckAuth';

import { setCurrentUser } from '@/utils/currentUserUtils';
import { validateRegisterForm } from '@/utils/formUtils';

import signInIcon from '../../../public/icons/sign-in-solid.svg';
import logo from '../../../public/icons/serval-logo.svg';

const initialErrorsState = {
    emailError: '',
    usernameError: '',
    passwordError: '',
    retypedPasswordError: ''
}

const RegisterForm = () => {

    const router = useRouter();
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
            <form onSubmit={handleSubmit} className={styles.form}>
                <Image src={logo} alt='logo' height='140' width='140' />
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
                <div className={styles.buttonContainer}>
                    <Button type='submit' text='Sign up' color='primary' />
                    <Image src={signInIcon} alt='icon' height='32' width='32' onClick={handleClick} className={styles.icon}/>
                </div>
                
            </form>
        </div>
        ) : null
    )
}

export default RegisterForm;
