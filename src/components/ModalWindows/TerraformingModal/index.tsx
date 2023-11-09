import { FC } from "react";
import { ModalVariousOptions } from "../../../Rules/ModalManager";
import { CardType } from "../../../Rules/card-types";
import styles from './TerraformingModal.module.scss';

export const TerraformingModal: FC<ModalVariousOptions<CardType>> = (props) => {

    return (
        <div className={styles.modal}>
            {props.params && props.params.map((select, id) => (
                <div
                    key={id}
                    className={styles.modalDialog}
                    onClick={() => props.onSelect(select)}>
                    {select}
                </div>
            ))}
        </div>
    );
}