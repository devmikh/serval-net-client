import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './index.module.css';
import logo from '../../../public/icons/serval-logo.svg';

const NotFound = () => {

    const router = useRouter();

    const onClick = () => {
        router.push('/');
    }

    return (
        <div className={styles.container}>
            <Image src={logo} alt='logo' width={64} className={styles.logo}/>
            <h1 className={styles.message}>404 | Page not found</h1>
            <button className={styles.homeLink} onClick={onClick}>Home</button>
        </div>
    )
}

export default NotFound;
