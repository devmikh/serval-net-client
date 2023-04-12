import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchPostsByUserId } from '@/store/features/postsSlice';
import useCheckAuth from '@/hooks/useCheckAuth';

import Profile from './Profile';
import PostInput from '@/components/core/PostInput';
import Post from '@/components/Post';

import styles from './index.module.css';
import avatar from "../../../public/icons/serval-logo.svg";
import { fetchUserById } from '@/store/features/userSlice';

const UserProfile = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const posts = useSelector((state: any) => state.posts);
    const currentUser = useSelector((state: any) => state.currentUser);
    const id = router.query.id as string;
    const [ownPage, setOwnPage] = useState(false);
    let content = null;
    useCheckAuth();

    useEffect(() => {
        /* We don't want to call our dispatch until our id is there
            (it is undefined during the first render) */
        if (!id) {
            return
        }
        if (currentUser.data) {
            setOwnPage(Number(id) === currentUser.data.id);
        } else {
            setOwnPage(false);
        }
        try {
            dispatch(fetchUserById(id));
            dispatch(fetchPostsByUserId(id));
        } catch(error: any) {
            console.error(error.message);
        }
        
    }, [id, currentUser]);
    
    if (posts.data) {
        if (posts.data.length) {
            content = posts.data.map((post: any) => {
                return (
                    <Post
                        key={post.post_id}
                        postId={post.post_id}
                        avatar={avatar}
                        fullName={post.full_name}
                        username={post.username}
                        userId={post.user_id}
                        date={post.date}
                        text={post.text}
                    />)
            })
        } else {
            content = 
                <span className={styles.noPostsPrompt}>
                    No posts yet...
                </span>
        }  
    }

    return (
        <div className={styles.userProfileContainer}>
            <Profile avatar={avatar} />
            
            <div className={styles.postsContainer}>
                { ownPage && <PostInput /> }
                {content}
            </div>
        </div>
    )
};

export default UserProfile;
