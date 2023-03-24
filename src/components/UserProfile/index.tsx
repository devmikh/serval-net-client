import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchPostsByUserId } from '@/store/features/postsSlice';
import Header from './Header';
import Post from '@/components/Post';

import styles from './index.module.css';
import avatar from "../../../public/icons/serval-logo.svg";

const UserProfile = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const posts = useSelector((state: any) => state.posts);

    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return
        }
        try {
            dispatch(fetchPostsByUserId(Number(id)));
        } catch(error: any) {
            console.error(error.message);
        }
        
    }, [id])
    

    return (
        <div className={styles.profileContainer}>
            <Header 
                avatar={avatar}
            />
            {posts.posts && posts.posts.map((post: any) => {
                return (
                    <Post
                        avatar={avatar}
                        fullName={'Mikhail Serebriakov'}
                        username={'misha'}
                        date={post.date}
                        text={post.text}
                    />)
            })}
        </div>
    )
};

export default UserProfile;