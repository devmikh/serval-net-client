import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import styles from './index.module.css';
import { formatDateMonthYear } from '@/utils/timeUtils';
import { useEffect } from 'react';

const Header = (props: any) => {
    const { avatar } = props;
    const router = useRouter();
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        if (user.error) {
            router.push('/404');
        }
    }, [user]);

    return (
        <div className={styles.header}>
            <Image className={styles.avatar} src={avatar} alt='avatar' width={100} />
            <div className={styles.nameContainer}>
                <span className={styles.fullName}>{user.data.full_name}</span>
                <span className={styles.username}>{user.data.username ? `@${user.data.username}` : null}</span>
            </div>
            <div className={styles.statsContainer}>
                    <div>
                        <span className={styles.postsCount}>{user.data.posts_count ? user.data.posts_count : 0}</span>
                        <span> posts</span>
                    </div>
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