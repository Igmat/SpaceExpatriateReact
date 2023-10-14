import { ResourcePrimitive } from "../../../Rules/card-types";
import styles from "./styles.module.scss";

interface ChooseResourceProps {
  array: Array<ResourcePrimitive[]>;
  select: (resources: ResourcePrimitive[]) => void;
}

export const ChooseResource = (props:ChooseResourceProps) => {

  return (
    <div className={styles.modal}>
      {props.array.map((resources, id) => (
        <div key={id} className={styles.modalDialog} onClick={()=>props.select(resources)}>{resources.join(" + ")}</div>
      ))}
    </div>
  );
};
