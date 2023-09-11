import { ResourcePrimitive } from "../../../Rules/card-types";
import styles from "./styles.module.scss";

interface ChooseResourceProps {
  array: ResourcePrimitive[];
  select: (resource: ResourcePrimitive) => void;
}

export const ChooseResource = (props:ChooseResourceProps) => {

  console.log(props.array);
  return (
    <div className={styles.modal}>
      {props.array.map((resource) => (
        <div className={styles.modalDialog} onClick={()=>props.select(resource)}>{resource}</div>
      ))}
    </div>
  );
};
