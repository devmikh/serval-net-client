import styles from './index.module.css';

const Button = (props: {
        type?: any,
        text?: string,
        color?: string
    }) => {

    const { type, text, color } = props;

    return (
        <button type={type} className={styles.button}>{text}</button>
    )
};

export default Button;