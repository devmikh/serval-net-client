import axios from 'axios';
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const RegisterForm = () => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/api/register', credentials);
            console.log(response);
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
            <TextField name="username" value={credentials.username} onChange={handleChange} />
            <TextField name="password" type="password" value={credentials.password} onChange={handleChange} />
            <Button type="submit" variant="contained">Register</Button>
        </form>
    )
}

export default RegisterForm;