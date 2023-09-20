import styles from "./ResourcesDeck.module.scss";
import { RoundManager } from "../../Rules/RoundManager";
import { ActionManager } from "../../Rules/ActionManager";
import { observer } from "mobx-react-lite";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import { NavLink } from "react-router-dom";
interface ResourcesDeckProps {
  round: RoundManager;
  action: ActionManager;
  resources: ResourcesModel;
}

export const ResourcesDeck = observer((props: ResourcesDeckProps) => {

  const endGame = () => {
    localStorage.clear();
    props.round.startNewGame()
  }

  return (
    <div className={styles.container}>
       <NavLink to="/"> <div className={styles.startBtn} onClick={endGame}>END GAME</div></NavLink>
      <div className={styles.garbage}>
      
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
