import { useRouter } from 'next/router';
import styles from './index.module.css';

const HomeButton = () => {

    const router = useRouter();

    const onClick = () => {
        router.push('/');
    }

    return (
        <div className={styles.button} onClick={onClick} title='Home'>
            <span>Home</span>
        </div>
    )
};

export default HomeButton;