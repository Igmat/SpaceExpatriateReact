import styles from "./styles.module.scss";
export const ChooseResourece = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalDialog}>Resource 1 </div>
      <div className={styles.modalDialog}>Resource 2</div>
    </div>
  );
};
