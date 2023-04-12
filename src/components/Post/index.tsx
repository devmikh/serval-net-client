import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { fetchPostsByUserId } from '@/store/features/postsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { formatDate, formatDateFromNow } from '@/utils/timeUtils';

import HeartIcon from '../core/Icons/HeartIcon';
import TrashIcon from '../core/Icons/TrashIcon';

import styles from './index.module.css';

const Post = (props: any) => {

    const [ liked, setLiked ] = useState(false);
    const [ownPost, setOwnPost] = useState(false);

    const dispatch = useAppDispatch();
    const currentUser = useSelector((state: any) => state.currentUser);

    const { postId, avatar, fullName, username, date, text, userId } = props;

    useEffect(() => {
        if (currentUser.data) {
            setOwnPost(Number(userId) === currentUser.data.id);
        } else {
            setOwnPost(false);
        }
    }, [currentUser]);

    const onLike = () => {
        // send request to backend to like/unlike post
        // ...

        setLiked(!liked);
    }

    const onDelete = async (id: any) => {
        try {
            const response = await axios.delete(`${process.env.SERVER_URL}/api/deletePost/${id}`, { withCredentials: true });
            if (response.status === 200) {
                dispatch({type: "user/decreasePostsCount"});
                dispatch(fetchPostsByUserId(currentUser.data.id));
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.header}>
                <Image className={styles.avatar} src={avatar} alt='avatar' width={60} unoptimized={true} />
                <div className={styles.nameContainer}>
                    <span className={styles.fullName}>{fullName}</span>
                    <span className={styles.username}>@{username}</span>
                </div>
                <span className={styles.date} title={formatDate(date)}>{ `${formatDateFromNow(date)}` }</span>
            </div>
            <p className={styles.text}>{text}</p>
            <div className={styles.actionsContainer}>
                <HeartIcon
                    onClick={onLike}
                    liked={liked}
                />
                {ownPost ?
                    <TrashIcon
                        onClick={() => onDelete(postId)} 
                    />
                    : null
                }
            </div>
        </div>
    );
};

export default Post;