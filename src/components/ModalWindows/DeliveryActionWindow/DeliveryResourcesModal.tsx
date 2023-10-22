import { ModalOptions, ResourcesModalOption } from "../../../Rules/ModalManager";
import styles from "./DeliveryActionWindow.module.scss";

export function DeliveryResourcesModal(props: ModalOptions<ResourcesModalOption>) {
    return (
        <div className={styles.modal}>
            {props.params && props.params.map((resources, id) => (
                <div key={id} className={styles.modalDialog} onClick={() => props.onSelect(resources)}></div>
            ))}
        </div>
    );
}