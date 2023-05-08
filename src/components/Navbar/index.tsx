import { useRouter } from 'next/router';
import LogoMin from '../core/LogoMin';
import CurrentUser from '../core/CurrentUser';
import styles from './index.module.css';

const Navbar = () => {
    const router = useRouter();

    const onClick = () => {
        router.push('/');
    }

    return (
        <div className={styles.navbar}>
            <LogoMin />
            <button className={styles.link} onClick={onClick} title='Home'>
                Home
            </button>
            <CurrentUser className={`${styles.link} ${styles.logoutLink}`} />
        </div>
    )
}

export default Navbar;