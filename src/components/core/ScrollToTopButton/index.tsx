import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import arrowIcon from '../../../../public/icons/angles-up-solid.svg';

const ScrollToTopButton = () => {

    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 600) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <button className={`${styles.scrollToTopButton} ${visible ? styles.visible : styles.hidden}`} onClick={scrollToTop}>
            <Image src={arrowIcon} className={styles.icon} alt='scroll up' width={32} height={32}/>
        </button>
    )
}

export default ScrollToTopButton;