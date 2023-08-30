import { useState } from "react";
import { ModalWindow } from "../../components/ModalWindow";
import styles from "./ResurseDeck.module.scss";

export const ResursesDeck = () => {
  const [showModal, setShowModal] = useState(false);
  const actionsArr = ["Build Colony", "Something", "Do nithing"];
  const modalTest = () => {
    console.log('Im in modal');
  }
  return (
    <div className={styles.container}>
      <h2>Resurses</h2>
      <div className={styles.garage} onClick={() => setShowModal(true)}>
        Garage
      </div>
      <ModalWindow 
      isShowModal={showModal} 
      closeModal={() => setShowModal(false)} 
      actionsArr={actionsArr}
      acttionOnClick={modalTest}/>
    </div>
  );
};
