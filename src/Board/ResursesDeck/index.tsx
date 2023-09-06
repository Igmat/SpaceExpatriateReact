import styles from "./ResurseDeck.module.scss";
import { RoundManager } from "../../Rules/RoundManager";
import { ActionManager } from "../../Rules/ActionManager";
import { observer } from "mobx-react-lite";
import { ResourcesModel } from "../../Rules/ResourcesModel";

interface ResurseDeckProps {
  round: RoundManager;
  action: ActionManager;
  resources: ResourcesModel;
}

export const ResursesDeck = observer((props: ResurseDeckProps) => {

  return (
    <div className={styles.container}>
      <div className={styles.garage}>
      
       <div className={styles.biotic}>
            {props.resources.garbageResources["biotic materials"]}
          </div>
          <div className={styles.fuel}>
            {props.resources.garbageResources.fuel}
          </div>
          <div className={styles.machinery}>
            {props.resources.garbageResources.machinery}
          </div>
          <div className={styles.minerals}>
            {props.resources.garbageResources.minerals}
          </div>
          <div className={styles.nanotechnologies}>
            {props.resources.garbageResources.nanotechnologies}
          </div>
      </div>

    </div>
  );
});
