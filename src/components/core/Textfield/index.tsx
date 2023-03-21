import styles from './index.module.css';

const Textfield = (props: {
        name?: string,
        placeholder?: string,
        value?: string,
        onChange?: any,
        type?: string,
        maxLength?: number,
        error?: string
    }) => {

    const { name, placeholder, value, onChange, type, maxLength, error } = props;

    return (
        <div className={styles.textfieldContainer}>
            <input
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type}
                autoComplete="new-password"
                maxLength={maxLength}
                className={styles.textfield}
            />
            <div className={styles.error}>{error}</div>
        </div>
        
        
    )
};

export default Textfield;