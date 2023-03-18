import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from '@/components/core/Button/Button';
import Textfield from '@/components/core/Textfield/Textfield';
import styles from '@/components/styles/authForm.module.css';

import useCheckAuth from '@/hooks/useCheckAuth';

import { setUser } from '@/utils/userUtils';

import signInIcon from '../../../public/icons/sign-in-solid.svg';
import logo from '../../../public/icons/serval-logo.svg';

const RegisterForm = () => {

    const router = useRouter();
    const isLoading = useCheckAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        retypedPassword: ''
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (credentials.password === credentials.retypedPassword) {
            try {
                const response = await axios.post('http://localhost:3030/api/register', credentials, { withCredentials: true });
                if (response.data.status === 'success') {
                    setUser(response.data.user);
                    router.push('/');
                } else {
                    console.log('User registration error');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Passwords do not match');
        }
        
    };

    const handleClick = () => {
        router.push('/login');
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
                <Image src={logo} alt='logo' height='140' width='140' />
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
                <Textfield
                    name='retypedPassword'
                    value={credentials.retypedPassword}
                    onChange={handleChange}
                    type='password'
                />
                <div className={styles.buttoncontainer}>
                    <Button type='submit' text='Sign up' color='primary' />
                    <Image src={signInIcon} alt='icon' height='32' width='32' onClick={handleClick} className={styles.icon}/>
                </div>
                
            </form>
        </div>
        ) : null
    )
}

export default RegisterForm;