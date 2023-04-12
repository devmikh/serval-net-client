import Image from 'next/image';
import trashIcon from '../../../../../public/icons/trash-solid.svg';

import styles from './index.module.css';

const TrashIcon = (props: any) => {

    const { onClick } = props;

    return (
        <div className={styles.trash}>
            <Image
                className={styles.trashIcon}
                src={ trashIcon }
                alt='delete'
                width={16}
                onClick={onClick}
            />
        </div>
    )
}

export default TrashIcon;