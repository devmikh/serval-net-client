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
    const [error, setError] = useState('');

    const handleChange = (event: any) => {
        setError('');
        setPostText(() => event.target.value);
    }

    const submitPost = async (event: any) => {
        event.preventDefault();
        setError('');
        
        if (postText.length < 1) {
            setError('Post should be at least 1 character in length');
        } else {
            const response = await axios.post(`${process.env.SERVER_URL}/api/createPost`, { text: postText}, {withCredentials: true});
            if (response.status === 200) {
                dispatch({type: "user/increasePostsCount"});
                dispatch(fetchPostsByUserId(user.id));
                setPostText('');
            }
        }
    }

    return (
        <form className={styles.container} onSubmit={submitPost}>
            <span className={styles.prompt}>What's on your mind?</span>
            <div className={styles.inputContainer}>
                <textarea name="postText" className={styles.textarea} maxLength={400} onChange={handleChange} value={postText} />
                {/* <div className={styles.error}>
                    {error}
                </div> */}
            </div>
            <button type='submit' className={styles.button}>Say</button>
        </form>
    )
}

export default PostInput;
