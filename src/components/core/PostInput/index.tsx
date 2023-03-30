import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchPostsByUserId } from '@/store/features/postsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import styles from './index.module.css';

const PostInput = () => {

    const dispatch = useAppDispatch();
    const user = useSelector((state: any) => state.currentUser.data);

    const [postText, setPostText] = useState('');

    const handleChange = (event: any) => {
        setPostText(() => event.target.value);
    }

    const submitPost = async (event: any) => {
        event.preventDefault();
        
        const response = await axios.post('http://localhost:3030/api/createPost', { text: postText}, {withCredentials: true});
        if (response.status === 200) {
            dispatch(fetchPostsByUserId(user.id));
        }
    }

    return (
        <form className={styles.container} onSubmit={submitPost}>
            <textarea name="postText" className={styles.textarea} placeholder="What's on your mind?" maxLength={100} onChange={handleChange} />
            <button type='submit' className={styles.button}>Post</button>
        </form>
    )
}

export default PostInput;
