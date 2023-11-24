import { FC } from "react";
import { ModalVariousOptions } from "../../../Rules/ModalManager";

import styles from "./styles.module.scss";
import { DeliveryCard } from "../../../Rules/Cards/delivery";

export const BlackMarketModal: FC<ModalVariousOptions<DeliveryCard>> = (props) => {
    return (
        <div className={styles.modal}>
            {props.params && props.params.map((card, id) => (
                <div key={id} className={styles.modalDialog} onClick={() => props.onSelect(card)}>
                    {card.resources.join(" + ")}
                </div>
            ))}
        </div>
    );
}