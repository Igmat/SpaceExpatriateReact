import styles from "./Military.module.scss";
import { MillitaryModalOptions, ModalOptions } from "../../../Rules/ModalManager";

export function MillitaryModal(props: ModalOptions<MillitaryModalOptions>) {

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
};
