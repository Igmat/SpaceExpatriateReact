import styles from "./Military.module.scss";
import { MillitaryModalOptions, ModalOptions } from "../../../Rules/ModalManager";

export function MillitaryModal (props: ModalOptions<MillitaryModalOptions>) {

  return (
    <div className={styles.modal}>
      <div className={styles.modalDialog} onClick={()=>props.chooseOption("exploration")}>Exploration</div>
      <div className={styles.modalDialog} onClick={()=>props.chooseOption("political")}>Political Pressure</div>
    </div>
  );
};
