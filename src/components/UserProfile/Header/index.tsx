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
            </div>
            <div className={styles.statsContainer}>
                {user.data.posts_count ?
                    <div>
                        <span className={styles.postsCount}>{user.data.posts_count}</span>
                        <span> posts</span>
                    </div> : null}
                {user.data.created_at ?
                    <div>
                        <span>Joined in </span>
                        <span className={styles.joinedDate}>{formatDateMonthYear(user.data.created_at)}</span>
                    </div> : null}
            </div>
        </div>
    )
}

export default Header;