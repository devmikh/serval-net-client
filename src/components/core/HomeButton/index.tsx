import Image from "next/image";
import { useRouter } from 'next/router';
import styles from './index.module.css';
import logo from "../../../../public/icons/serval-logo.svg";

const HomeButton = () => {

    const router = useRouter();

    const onClick = () => {
        router.push('/');
    }

    return (
        <Image src={logo} alt='logo' width={64} className={styles.logo} onClick={onClick}/>
    )
};

export default HomeButton;