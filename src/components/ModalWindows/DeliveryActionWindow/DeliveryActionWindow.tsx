import styles from "./DeliveryActionWindow.module.scss";
import { DeliveryModalOption, ModalOptions} from "../../../Rules/ModalManager";

export function DeliveryActionWindow(props: ModalOptions<DeliveryModalOption>) {

  return (
    <div className={styles.modal}>
      {props.params && props.params.map((select, id) => (
        <div key={id} className={styles.modalDialog} onClick={() => props.onSelect(select)}></div>
      ))}
    </div>
  );
};
