import styles from "./Military.module.scss";
import { ModalOptions } from "../../../Rules/ModalManager";
import { FC } from "react";
import { Militaryoption } from "../../../Rules/Military";

export const MillitaryModal: FC<ModalOptions<Militaryoption>> = (props) => {

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
