import Image from 'next/image';
import styles from './index.module.css';
import logo from '../../../../public/icons/serval-logo.svg';

const Logo = () => {
    return (
        <div className={styles.logoContainer}>
                    <Image src={logo} alt='logo' height='140' width='140' className={styles.logo} />
                    <div className={styles.logoText}>
                        <span className={styles.logoTextMain}>SERVAL</span>
                        <span className={styles.logoTextSub}>net</span>
                    </div>
                </div>
    )
}

export default Logo;