import styles from './Textfield.module.css';

const Textfield = (props: {
        name?: string,
        placeholder?: string,
        value?: string,
        onChange?: any,
        type?: string
    }) => {

    const { name, placeholder, value, onChange, type } = props;

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