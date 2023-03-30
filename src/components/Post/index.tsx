import { useState } from 'react';
import Image from 'next/image';

import { formatDate, formatDateFromNow } from '@/utils/timeUtils';

import styles from './index.module.css';

import heartIcon from '../../../public/icons/heart.svg';
import heartFilledIcon from '../../../public/icons/heart-filled.svg';

const Post = (props: any) => {

    const [ liked, setLiked ] = useState(false);

    const { avatar, fullName, username, date, text } = props;

    const onLike = () => {
        // send request to backend to like/unlike post
        // ...

        setLiked(!liked);
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
            </div>
        </div>
    );
};

export default Post;