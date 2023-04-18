import { useSelector } from "react-redux";
import Notification from "@/components/core/Notification";
import styles from './index.module.css';

const Notifications = () => {

    const notifications = useSelector((state: any) => state.notification.notifications);

    return (
        <div className={styles.notificationsContainer}>
            {notifications.map((notification: any) => {
                return <Notification id={notification.id} message={notification.message} type={notification.type}/>
            })}
        </div>
    )
}

export default Notifications;