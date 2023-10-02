import { useState } from "react";
import styles from "./DeliveryActionWindow.module.scss";
import { ResourcePrimitive } from "../../../Rules/card-types";
import { DeliveryOption } from "../../../Rules/Delivery";
import { useGameState } from "../../../Rules";

export const DeliveryActionWindow = () => {
  const gameState = useGameState();

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleDeliveryOption = (option: DeliveryOption) => {
    gameState.action.select(option);
    setIsOptionSelected(true);
  };

  const handleResource = (resource: ResourcePrimitive) => {
    setIsOptionSelected(false);
    gameState.action.select(resource);
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
