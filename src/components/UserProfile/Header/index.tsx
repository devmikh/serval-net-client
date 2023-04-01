import Image from 'next/image';
import { useSelector } from "react-redux";
import styles from './index.module.css';
import { formatDateMonthYear } from '@/utils/timeUtils';

const Header = (props: any) => {
    const { avatar } = props;
    const user = useSelector((state: any) => state.user);
    return (
        <div className={styles.header}>
            <Image className={styles.avatar} src={avatar} alt='avatar' width={100} />
            <div className={styles.nameContainer}>
                <span className={styles.fullName}>{user.data.full_name}</span>
                <span className={styles.username}>{user.data.username ? `@${user.data.username}` : null}</span>
                <span className={styles.postsCount}>{user.data.posts_count ? `${user.data.posts_count} posts` : null}</span>
                <span className={styles.joinedDate}>{user.data.created_at ? `Joined in ${formatDateMonthYear(user.data.created_at)}` : null}</span>
            </div>
        </div>
    )
}

export default Header;