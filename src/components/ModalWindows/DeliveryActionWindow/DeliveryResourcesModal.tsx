import { FC } from "react";
import { ModalOptions } from "../../../Rules/ModalManager";
import styles from "./DeliveryActionWindow.module.scss";
import { BasicResource } from "../../../Rules/card-types";

export const DeliveryResourcesModal: FC<ModalOptions<BasicResource>> = (props) => {
    return (
        <div className={styles.container}>
            {props.params && props.params.map((resource, id) => (
                <div
                    key={id}
                    className={styles.action}
                    onClick={() => props.onSelect(resource)}>
                    {resource}
                </div>
            ))}
        </div>
    );
}