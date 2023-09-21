import { Resource } from "../../Rules/card-types";
import styles from "./Resource.module.scss";

export interface ResourceComponentProps {
  type: Resource;
}

export const ResourceComponent = (props: ResourceComponentProps) => {
  const normalisedType =
    typeof props.type === "string"
      ? [props.type.split(" ").join("-")]
      : props.type.map((el) => el.split(" ").join("-"));


  return (
    <div>
      {normalisedType.map((el, ind) => {
        return (
          <div key={ind}>
            <div className={`${styles[el]} ${styles.resource}`}>
              <div className={styles.resName}> {el}</div>
            </div>{" "}
            {ind !== normalisedType.length - 1 && "/"}{" "}
            <div />
          </div>
        );
      }
      )}
    </div>
  );
}