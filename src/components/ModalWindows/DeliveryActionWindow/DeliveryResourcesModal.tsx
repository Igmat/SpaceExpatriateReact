import { FC } from "react";
import { ModalVariousOptions } from "../../../Rules/ModalManager";
import styles from "./DeliveryActionWindow.module.scss";
import { BasicResource } from "../../../Rules/card-types";

export const DeliveryResourcesModal: FC<ModalVariousOptions<BasicResource>> = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.resources}>
                {props.params && props.params.map((resource, id) => (
                    <div
                        key={id}
                        className={`${resource === "biotic materials" ? styles.bioticMaterial : styles[resource]}`}
                        onClick={() => props.onSelect(resource)}>
                    </div>
                ))}
            </div>
        </div>
    );
}