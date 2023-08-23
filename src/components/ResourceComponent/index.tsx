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
    <>
      {normalisedType.map((el, ind) => <><div key={ind} className={`${styles[el]} ${styles.resource}`} /> {ind !== normalisedType.length - 1 && "/"} </>)}
    </>
  );
};
