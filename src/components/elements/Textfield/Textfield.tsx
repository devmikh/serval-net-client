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
        <div className={styles.textfield}>
            {icon ? <Image src={icon} alt='icon' width='16' height='16' className={styles.icon}/> : null}
            <input
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            autoComplete="new-password"
            className={styles.inputfield}
        />
        </div>
        
    )
};

export default Textfield;