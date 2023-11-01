import { FC } from "react";
import { ModalOptions } from "../../../Rules/ModalManager";
import { DeliveryCard } from "../../../Rules/card-types";
import styles from "./styles.module.scss";

export const BlackMarketModal: FC<ModalOptions<DeliveryCard>> = (props) => { 
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