import { useState } from "react";
import styles from "./DeliveryActionWindow.module.scss";
import { RoundManager } from "../../../../Rules/RoundManager";
import {
  ResourcePrimitive,
} from "../../../../Rules/card-types";
import { ActionManager } from "../../../../Rules/ActionManager";
import { ResourcesModel } from "../../../../Rules/ResourcesModel";

interface DeliveryActionWindowProps {
  action: ActionManager;
  resources: ResourcesModel;
  round: RoundManager;
}

export const DeliveryActionWindow = (props: DeliveryActionWindowProps) => {
  const [chooseResource, setChooseResource] = useState(false);

  const charterHandle = () => {

    setChooseResource(true);
   // console.log('charter')
  };
  const garbageHandle = () => {

    setChooseResource(true);
  };

  const handleChoose = (arg: ResourcePrimitive) => {
    setChooseResource(false);
    props.action.tryNext();
    /*!!! отсутствует deliveryBranch, будет переписан
    props.round.nextPerformingStep()
    if (props.round.deliveryBranch.charter) {
      props.resources.getResources(arg);
     // console.log('charter')
    }
    if (props.round.deliveryBranch.garbage) {
      props.resources.removeResourcesFromGarbage(arg);
      props.action.tryNext();
     // console.log('Try next')
    }*/
  };

  return (
    <div className={styles.container}>
      {!chooseResource ? (
        <>
          <div className={styles.action} onClick={() => charterHandle()}>
            Charter Vessel
          </div>
          <div className={styles.action} onClick={() => garbageHandle()}>
            Garbage Collection
          </div>
        </>
      ) : (
        <div className={styles.resources}>
          <div
            className={styles.violet}
            onClick={() => handleChoose("fuel")}
          ></div>
          <div
            className={styles.blue}
            onClick={() => handleChoose("minerals")}
          ></div>
          <div
            className={styles.green}
            onClick={() => handleChoose("biotic materials")}
          ></div>
          <div
            className={styles.red}
            onClick={() => handleChoose("machinery")}
          ></div>
          <div
            className={styles.yellow}
            onClick={() => handleChoose("nanotechnologies")}
          ></div>
        </div>
      )}
    </div>
  );
};
