import { observer } from "mobx-react-lite";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import styles from "./PlayerMenu.module.scss";

interface PlayerMenuProps {
  resources: ResourcesModel;
}
export const PlayerMenu = observer((props: PlayerMenuProps) => {
  // console.log(props.resources.playerResources);
  return (
    <div className={styles.container}>
      <div className={styles.playerResources}>
        <div className={styles.biotic}>
          {props.resources.playerResources["biotic materials"]}
        </div>
        <div className={styles.fuel}>
          {props.resources.playerResources.fuel}
        </div>
        <div className={styles.machinery}>
          {props.resources.playerResources.machinery}
        </div>
        <div className={styles.minerals}>
          {props.resources.playerResources.minerals}
        </div>
        <div className={styles.nanotechnologies}>
          {props.resources.playerResources.nanotechnologies}
        </div>
        <div className={styles.dark}>
          {props.resources.playerResources["dark matter"]}
        </div>
        <div className={styles.energy}>
          Energy: {props.resources.energy}
        </div>
        <div className={styles.points}>TPs{props.resources.points.total}</div>
      </div>
    </div>
  );
});
