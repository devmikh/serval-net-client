import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from './RegisterForm.module.css';
import Button from '../core/Button/Button';
import Textfield from '../core/Textfield/Textfield';
import atIcon from '../../../public/images/at-solid.svg';
import keyIcon from '../../../public/images/key-solid.svg';
import logo from '../../../public/images/serval-logo.svg';

const RegisterForm = () => {

    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        retypedPassword: ''
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (credentials.password === credentials.retypedPassword) {
            try {
                const response = await axios.post('http://localhost:3030/api/register', credentials);
                if (response.data.status === 'success') {
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

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        console.log(value)
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.registerform}>
                <Image src={logo} alt='logo' height='100' width='100' />
                <h1 className={styles.h1}>Create new account</h1>
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
                <Textfield
                    name='retypedPassword'
                    value={credentials.retypedPassword}
                    onChange={handleChange}
                    type='password'
                    placeholder="Confirm password"
                    icon={keyIcon}
                />
                <Button type='submit' text='Register' color='primary' />
                <Link href="/login" className={styles.link}>sign in</Link>
            </form>
        </div>
    )
}

export default RegisterForm;