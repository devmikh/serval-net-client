import { useRouter } from 'next/router';

import Header from './Header';
import Post from '@/components/Post';

import styles from './index.module.css';
import avatar from "../../../public/icons/serval-logo.svg";

const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className={styles.profileContainer}>
            <Header 
                avatar={avatar}
            />
            <Post
                avatar={avatar}
                fullName={'Mikhail Serebriakov'}
                username={'misha'}
                date={'1 day ago'}
                text={'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu'}
            />
        </div>
    )
};

export default UserProfile;