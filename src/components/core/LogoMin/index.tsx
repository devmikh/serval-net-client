import Image from 'next/image';
import styles from './index.module.css';
import logo from '../../../../public/icons/serval-logo.svg';

const LogoMin = () => {
    return (
        <div className={styles.logoContainer}>
            <Image src={logo} alt='logo' height='48' width='48' className={styles.logo} />
        </div>
    )
}

export default LogoMin;