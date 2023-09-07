import { useState } from "react";
import styles from "./DeliveryActionWindow.module.scss";
import { DeliveryOption, RoundManager } from "../../../../Rules/RoundManager";
import {
  CardDefinition,
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

  const deliveriOptionHendler = (arg: DeliveryOption) => {
props.round.shooseDeliveryOption(arg)
    setChooseResource(true);
  };


  const handleChoose = (resource: ResourcePrimitive) => {
    setChooseResource(false);
    props.action.resourceAction(resource)
  };

  return (
    <div className={styles.container}>
      {!chooseResource ? (
        <>
          <div className={styles.action} onClick={() => deliveriOptionHendler('charter')}>
            Charter Vessel
          </div>
          <div className={styles.action} onClick={() => deliveriOptionHendler('garbage')}>
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
