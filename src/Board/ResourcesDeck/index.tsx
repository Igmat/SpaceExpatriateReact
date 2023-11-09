import styles from "./ResourcesDeck.module.scss";
import { RoundManager } from "../../Rules/RoundManager";
import { ActionManager } from "../../Rules/ActionManager";
import { observer } from "mobx-react-lite";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import { BasicResources } from "../../Rules/card-types";

interface ResourcesDeckProps {
  round: RoundManager;
  action: ActionManager;
  resources: ResourcesModel;
}

export const ResourcesDeck = observer((props: ResourcesDeckProps) => {

  return (
    <div className={styles.container}>

      <div className={styles.garbage}>
        {BasicResources.map((resource, id) => (
          <div key={id} className={`${resource === "biotic materials" ? styles.biotic : styles[resource]}`}>
            {props.resources.garbageResources[resource]}
          </div>
        ))}
      </div>
    </div>
  );
});
