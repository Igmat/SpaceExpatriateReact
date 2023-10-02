import { useEffect, useState } from "react";
import styles from './Notification.module.scss';

interface NotificationProps {
    diff?: number;
}

export const Notification = (props: NotificationProps) => {
    const [notification, setNotification] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (props.diff) {
            setNotification(props.diff)

            const timeout = setTimeout(() => {
                setNotification(undefined)
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [props.diff]);

    return (
        <div className={styles.notification}>
            {notification &&
                <span className={`${notification > 0 ? styles.notificationGreen : styles.notificationRed}`}>
                    {notification < 0 ? notification : `+${notification}`}
                </span >}

        </div>
    );
};

