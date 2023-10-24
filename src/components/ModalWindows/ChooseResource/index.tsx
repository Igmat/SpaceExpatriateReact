import { FC } from "react";
import { ModalOptions } from "../../../Rules/ModalManager";
import { ResourcePrimitive } from "../../../Rules/card-types";
import styles from "./styles.module.scss";

export const ChooseResource:FC<ModalOptions<ResourcePrimitive[]>> = (props) => {

  return (
    <div className={styles.modal}>
      {props.params && props.params.map((resources, id) => (
        <div key={id} className={styles.modalDialog} onClick={() => props.onSelect(resources)}>{resources.join(" + ")}</div>
      ))}
    </div>
  );
};
