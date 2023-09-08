import { useState } from "react";
import styles from "./DeliveryActionWindow.module.scss";
import { ResourcePrimitive } from "../../../Rules/card-types";
import { ActionManager } from "../../../Rules/ActionManager";
import { DeliveryOption } from "../../../Rules/Delivery";

interface DeliveryActionWindowProps {
  action: ActionManager;
}

export const DeliveryActionWindow = (props: DeliveryActionWindowProps) => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleDeliveryOption = (option: DeliveryOption) => {
    props.action.select(option);
    setIsOptionSelected(true);
  };

  const handleResource = (resource: ResourcePrimitive) => {
    setIsOptionSelected(false);
    props.action.select(resource);
  };

  return (
    <div className={styles.container}>
      {!isOptionSelected ? (
        <>
          <div
            className={styles.action}
            onClick={() => handleDeliveryOption("charter")}
          >
            Charter Vessel
          </div>
          <div
            className={styles.action}
            onClick={() => handleDeliveryOption("garbage")}
          >
            Garbage Collection
          </div>
        </>
      ) : (
        <div className={styles.resources}>
          <div
            className={styles.violet}
            onClick={() => handleResource("fuel")}
          ></div>
          <div
            className={styles.blue}
            onClick={() => handleResource("minerals")}
          ></div>
          <div
            className={styles.green}
            onClick={() => handleResource("biotic materials")}
          ></div>
          <div
            className={styles.red}
            onClick={() => handleResource("machinery")}
          ></div>
          <div
            className={styles.yellow}
            onClick={() => handleResource("nanotechnologies")}
          ></div>
        </div>
      )}
    </div>
  );
};
