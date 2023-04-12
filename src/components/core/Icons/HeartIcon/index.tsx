import Image from 'next/image';

import heartIcon from '../../../../../public/icons/heart.svg';
import heartFilledIcon from '../../../../../public/icons/heart-filled.svg';

import styles from './index.module.css';

const HeartIcon = (props: any) => {

    const { onClick, liked } = props;

    return (
        <div className={styles.heart} onClick={onClick}>
            <Image
                className={styles.heartIcon}
                src={ liked ? heartFilledIcon : heartIcon }
                alt='like'
                width={16}
                onClick={onClick}
            />
        </div>
    )
}

export default HeartIcon;