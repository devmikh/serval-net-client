interface LoginCredentials {
    email: string,
    password: string
};

interface RegisterCredentials {
    email: string,
    username: string,
    fullName?: string,
    password: string,
    retypedPassword: string
};

const validateLoginForm = (credentials: LoginCredentials) => {
    const { email, password } = credentials;
    let isValid = true;
    const errors = {
        emailError: '',
        passwordError: ''
    };

    if (email.length === 0) {
        errors.emailError = 'Please enter your email';
        isValid = false;
    } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            errors.emailError = 'Email address is not valid';
            isValid = false;
        }
    }

    if (password.length === 0) {
        errors.passwordError = 'Please enter your password';
        isValid = false;
    }

    return {
        isValid,
        errors
    };
};

const validateRegisterForm = (credentials: RegisterCredentials) => {
    const { email, username, password, retypedPassword } = credentials;
    let isValid = true;
    const errors = {
        emailError: '',
        usernameError: '',
        passwordError: '',
        retypedPasswordError: ''
    };

    /* Email validation */

    if (email.length === 0) {
        errors.emailError = 'Please enter a valid email address';
        isValid = false;
    } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            errors.emailError = 'Email address is not valid';
            isValid = false;
        }
    }
    
    /* Username validation */
    if (username.length === 0) {
        errors.usernameError = 'Please enter a username';
        isValid = false;
    }

    /* Password validation */
    if (password.length === 0) {
        errors.passwordError = 'Please enter a password';
        isValid = false;
    } else if (password.length < 8) {
        errors.passwordError = 'Password must contain at least 8 characters';
        isValid = false;
    } else {
        if (password.length >= 8 && retypedPassword.length === 0) {
            errors.retypedPasswordError = 'Please confirm password';
            isValid = false;
        } else if (password !== retypedPassword) {
            errors.retypedPasswordError = 'Passwords do not match';
            isValid = false;
        }
    }

    return {
        isValid,
        errors
    };
}

export {
    validateLoginForm,
    validateRegisterForm
};