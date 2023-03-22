import Image from 'next/image';
import styles from './index.module.css';

const Header = (props: any) => {
    const { avatar } = props;

    return (
        <div className={styles.header}>
            <Image className={styles.avatar} src={avatar} alt='avatar' width={100} />
            <div className={styles.nameContainer}>
                <span className={styles.fullName}>Mikhail Serebriakov</span>
                <span className={styles.username}>@misha</span>
            </div>
        </div>
    )
}

export default Header;