import { ModalOptions } from "../../../Rules/ModalManager";
import { CardType } from "../../../Rules/card-types";
import styles from './TerraformingModal.module.scss';

export function TerraformingModal (props: ModalOptions<CardType>) {

    return (
        <div className={styles.modal}>
            {props.params && props.params.map((selected, id) => (
                <div key={id} className={styles.modalDialog} onClick={() => props.onSelect(selected)}></div>
            ))}
        </div>
    );
}