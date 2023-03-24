import Image from 'next/image';
import { useSelector } from "react-redux";
import styles from './index.module.css';

const Header = (props: any) => {
    const { avatar } = props;
    const user = useSelector((state: any) => state.user);

    return (
        <div className={styles.header}>
            <Image className={styles.avatar} src={avatar} alt='avatar' width={100} />
            <div className={styles.nameContainer}>
                <span className={styles.fullName}>{user.data && user.data.full_name}</span>
                <span className={styles.username}>@{user.data && user.data.username}</span>
            </div>
        </div>
    )
}

export default Header;