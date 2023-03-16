import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import useCheckAuth from '@/hooks/useCheckAuth';
import styles from '../styles/authForm.module.css';
import Button from '../core/Button/Button';
import Textfield from '../core/Textfield/Textfield';
import signUpIcon from '../../../public/images/sign-up-solid.svg';
import logo from '../../../public/images/serval-logo.svg';

const LoginForm = () => {

    const router = useRouter();

    const isLoading = useCheckAuth();

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

    const handleClick = () => {
        router.push('/register');
    }

    const handleChange = (event: any) => {
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
                <Image src={logo} alt='logo' height='140' width='140' className={styles.logo} />
                <Textfield
                    name='email'
                    value={credentials.email}
                    onChange={handleChange}
                />
                <Textfield
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    type='password'
                />
                <div className={styles.buttoncontainer}>
                    <Button type='submit' text='Sign in' color='primary' />
                    <Image src={signUpIcon} alt='icon' height='32' width='32' onClick={handleClick} className={styles.icon}/>
                </div>
                {/* <Link href="/register" className={styles.link}>create new account</Link> */}
                {/* Workaround to disable autocompletion of the form */}
                <input autoComplete="on" style={{ display: 'none' }}
                    id="fake-hidden-input-to-disable autocomplete"></input>
            </form>
        </div>
        ) : null
    )
}

export default LoginForm;