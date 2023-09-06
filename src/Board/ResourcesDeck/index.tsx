import { useContext, useState } from "react";
import styles from "./ResourcesDeck.module.scss";
import { useModalService } from "../../components/ModalWindow";

export const ResourcesDeck = () => {
  const modalService = useModalService();

  const content = (
    <div className={styles.contentContainer}>
      <div onClick={() => console.log('1')}>Build Colony</div>
      <div onClick={() => console.log('2')}>Something</div>
      <div onClick={() => console.log('3')}>Something</div>
    </div>
  );


  return (
    <div className={styles.container}>
      <h2>Resources</h2>
      <div className={styles.garbage} onClick={() => modalService.show(content)}>
        Garbage
      </div>
    </div>
  );
};
