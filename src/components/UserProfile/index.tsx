import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchPostsByUserId } from '@/store/features/postsSlice';

import Header from './Header';
import Post from '@/components/Post';

import styles from './index.module.css';
import avatar from "../../../public/icons/serval-logo.svg";
import { fetchUserById } from '@/store/features/userSlice';

const UserProfile = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const posts = useSelector((state: any) => state.posts);
    const id = router.query.id as string;

    useEffect(() => {
        /* We don't want to call our dispatch until our id is there
            (it is undefined during the first render) */
        if (!id) {
            return
        }
        try {
            dispatch(fetchUserById(id));
            dispatch(fetchPostsByUserId(id));
        } catch(error: any) {
            console.error(error.message);
        }
        
    }, [id]);
    

    return (
        <div className={styles.profileContainer}>
            <Header 
                avatar={avatar}
            />
            {posts.data && posts.data.map((post: any) => {
                return (
                    <Post
                        avatar={avatar}
                        fullName={post.full_name}
                        username={post.username}
                        date={post.date}
                        text={post.text}
                    />)
            })}
        </div>
    )
};

export default UserProfile;