import { useEffect } from "react";
import Image from 'next/image';
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removeNotification } from "@/store/features/notificationSlice";
import successIcon from "../../../../public/icons/circle-check-solid.svg";
import styles from './index.module.css';

const Notification = (props: any) => {
    const dispatch = useAppDispatch();
    const {id, message, type} = props;

    useEffect(() => {
        setTimeout(() => {
            dispatch(removeNotification(id));
        }, 3000);
    }, []);

    return (
        <div className={styles.notification}>
            <Image src={type === 'success' ? successIcon : null} alt='icon' width={24} className={styles.icon} />
            <span>{message}</span>
        </div>
    )
}
export default Notification;