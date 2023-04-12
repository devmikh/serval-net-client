import styles from './index.module.css';

const Button = (props: {
        type?: any,
        text?: string,
        color?: any,
        className?: any
    }) => {

    const { type, text, color, className } = props;

    return (
        <button type={type} className={`${styles.button} ${styles[color]} ${className}`}>{text}</button>
    )
};

export default Button;