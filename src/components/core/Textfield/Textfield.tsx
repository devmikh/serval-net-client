import styles from './Textfield.module.css';
import Image from 'next/image';

const Textfield = (props: {
        name?: string,
        placeholder?: string,
        value?: string,
        onChange?: any,
        type?: string,
        icon?: any
    }) => {

    const { name, placeholder, value, onChange, type, icon } = props;

    return (
        <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            autoComplete="new-password"
            className={styles.textfield}
        />
        
    )
};

export default Textfield;