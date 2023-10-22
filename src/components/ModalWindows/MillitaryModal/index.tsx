import styles from "./Military.module.scss";
import { MillitaryModalOptions, ModalOptions } from "../../../Rules/ModalManager";

export function MillitaryModal (props: ModalOptions<MillitaryModalOptions>) {

  return (
    <div className={styles.modal}>
      {props.params && props.params.map((selected, id) => (
        <div key={id} className={styles.modalDialog} onClick={() => props.onSelect(selected)}></div>
      ))}
    </div>
  );
};
