import { useContext, useState } from "react";
import styles from "./ResurseDeck.module.scss";
import { useModalService } from "../../components/ModalWindow";

export const ResursesDeck = () => {
  // const [showModal, setShowModal] = useState(false);
  //  const actionsArr = ["Build Colony", "Something", "Do nithing"];

  const modalService = useModalService();

  const content = (
    <div className={styles.contentContainer}>
      <div onClick={() => console.log('1')}>Build Colony</div>
      <div onClick={() => console.log('2')}>Something</div>
      <div onClick={() => console.log('3')}>Something</div>
    </div>
  );

console.log(' ResursesDeck')
  return (
    <div className={styles.container}>
      <h2>Resurses</h2>
      <div className={styles.garage} onClick={() => modalService.show(content)}>
        Garage
      </div>
    </div>
  );
};
