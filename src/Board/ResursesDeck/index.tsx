import { useState } from "react";
import { ModalWindow } from "../../components/ModalWindow";
import styles from "./ResurseDeck.module.scss";

export const ResursesDeck = () => {
  const [modal, setModal] = useState(false);
  const actionsArr = ["Build Colony", "aa", "Do nithing"];
  const modalTest = () => {
    console.log('Im in modal');
  }
  return (
    <div className={styles.container}>
      <h2>Resurses</h2>
      <div className={styles.garage} onClick={() => setModal(true)}>
        Garage
      </div>
      <ModalWindow 
      isModal={modal} 
      closeModal={() => setModal(false)} 
      actionsArr={actionsArr}
      acttionOnClick={modalTest}/>
    </div>
  );
};
