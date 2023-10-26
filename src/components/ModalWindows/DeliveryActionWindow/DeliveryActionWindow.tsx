import styles from "./DeliveryActionWindow.module.scss";
import { ModalOptions} from "../../../Rules/ModalManager";
import { FC } from "react";
import { DeliveryOption } from "../../../Rules/Delivery";

export const DeliveryActionWindow: FC<ModalOptions<DeliveryOption>> = (props) => {
  
  return (
    <div className={styles.container}>
      {props.params && props.params.map((select, id) => (
        <div key={id}
          className={styles.action}
          onClick={() => props.onSelect(select)}>
          {select}
        </div>
      ))}
    </div>
  );
};
