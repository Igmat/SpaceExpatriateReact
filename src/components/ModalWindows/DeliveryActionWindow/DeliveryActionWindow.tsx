import { useState } from "react";
import styles from "./DeliveryActionWindow.module.scss";
import { DeliveryModalOption, ModalOptions, ResourcesModalOption } from "../../../Rules/ModalManager";

export function DeliveryActionWindow (props: ModalOptions<DeliveryModalOption | ResourcesModalOption>) {

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleDeliveryOption = (option: string) => {
    props.chooseOption(option as DeliveryModalOption);
    setIsOptionSelected(true);
  };

  const handleResource = (option: string) => {
    props.chooseOption(option as ResourcesModalOption);
    setIsOptionSelected(false);
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
