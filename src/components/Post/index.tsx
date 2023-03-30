import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { fetchPostsByUserId } from '@/store/features/postsSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { formatDate, formatDateFromNow } from '@/utils/timeUtils';

import styles from './index.module.css';

import heartIcon from '../../../public/icons/heart.svg';
import heartFilledIcon from '../../../public/icons/heart-filled.svg';
import trashIcon from '../../../public/icons/trash-solid.svg';

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
                <Image
                    className={styles.heart}
                    src={ liked ? heartFilledIcon : heartIcon }
                    alt='like'
                    width={24}
                    onClick={() => onLike()}
                />
                {ownPost ? <Image
                        className={styles.trash}
                        src={ trashIcon }
                        alt='delete'
                        width={20}
                        onClick={() => onDelete(postId)}
                    /> : null
                }
            </div>
        </div>
    );
};

export default Post;