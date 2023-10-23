import { ModalOptions, ResourcesModalOption } from "../../../Rules/ModalManager";
import styles from "./DeliveryActionWindow.module.scss";

export function DeliveryResourcesModal(props: ModalOptions<ResourcesModalOption>) {
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