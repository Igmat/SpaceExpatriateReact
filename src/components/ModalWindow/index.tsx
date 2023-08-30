import React from "react";
import styles from "./ModalWindow.module.scss";

interface ModalWindowProps {
  isModal: boolean;
  closeModal: () => void;
  actionsArr: string[];
  acttionOnClick: () => void;
}

export const ModalWindow = (props: ModalWindowProps) => {

  const keydownHandler = ({ key }: any) => {
    switch (key) {
      case "Escape":
        props.closeModal();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  
  const closeModal = () => {
    props.closeModal();
  };

  return !props.isModal ? null : (
    <div className={styles.modal}>
      <div className={styles.modalDialog}>
        <button onClick={closeModal}>X</button>
        <div className={styles.actionsContainer} >
          {props.actionsArr.map((el: string, ind: number) => (
            <div onClick={props.acttionOnClick} key={ind}>{el}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
