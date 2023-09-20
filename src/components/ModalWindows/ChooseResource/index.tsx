import { ResourcePrimitive } from "../../../Rules/card-types";
import styles from "./styles.module.scss";

interface ChooseResourceProps {
  array: Array<ResourcePrimitive[]>;
  select: (resources: ResourcePrimitive[]) => void;
}

export const ChooseResource = (props:ChooseResourceProps) => {

  console.log(props.array);
  return (
    <div className={styles.modal}>
      {props.array && props.array.map((resources) => (
        <div className={styles.modalDialog} onClick={()=>props.select(resources)}>{resources.join(" + ")}</div>
      ))}
    </div>
  );
};
