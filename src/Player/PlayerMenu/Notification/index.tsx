import { useEffect, useState } from "react";
import styles from './Notification.module.scss';
import { ResourcePrimitive } from "../../../Rules/card-types";

type playerResources = {
    [key in ResourcePrimitive]: number;
};

interface NotificationProps {
    diff: Partial<playerResources>;
    resource: string;
}

export const Notification = (props: NotificationProps) => {
    const [notification, setNotifications] = useState({} as Partial<playerResources>);


    useEffect(() => {
        if (props.diff.hasOwnProperty(props.resource as ResourcePrimitive)) {
            setNotifications(props.diff);

            setTimeout(() => {
                setNotifications({});
            }, 3000);
        }
    }, [props.diff, props.resource]);

    const notify = notification[props.resource as ResourcePrimitive]

    return (
        <div className={styles.notification}>
            {notify &&
                <span className={`${notify > 0 ? styles.notificationGreen : styles.notificationRed}`}>
                    {notify < 0 ? notify : `+${notify}`}
                </span >}
        </div>
    );
};

