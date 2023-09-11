import { ResourcePrimitive } from "../../../Rules/card-types";
import styles from "./styles.module.scss";


export const ChooseResourece = (props:{array:ResourcePrimitive[]}) => {
  return (
    <div className={styles.modal}>
      {props.array.map((resource) => (
        <div className={styles.modalDialog}>{resource}</div>
      ))}
      <div className={styles.modalDialog}>Resource 1</div>
      <div className={styles.modalDialog}>Resource 2</div>
    </div>
  );
};
