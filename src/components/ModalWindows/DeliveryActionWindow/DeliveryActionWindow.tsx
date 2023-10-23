import styles from "./DeliveryActionWindow.module.scss";
import { DeliveryModalOption, ModalOptions} from "../../../Rules/ModalManager";

export function DeliveryActionWindow(props: ModalOptions<DeliveryModalOption>) {
  
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
