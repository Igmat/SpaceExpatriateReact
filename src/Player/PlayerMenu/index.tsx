import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import { useEffect, useState } from "react";
import { Notification } from "./Notification";
import { PlayerResources } from "../../Rules/ResourcesModel";
import styles from "./PlayerMenu.module.scss";

interface PlayerMenuProps {
  resources: ResourcesModel;
}

const resourceReaction = (value: PlayerResources, handleChange: (diff: Partial<PlayerResources>) => void) => reaction(
  () => ({ ...value } as PlayerResources),
  (changedResources, prev) => {
    const diff = Object.keys(changedResources)
      .map(key => ({ key, diff: changedResources[key] - prev[key] }))
      .filter(el => el.diff !== 0)
      .reduce((acc, el) => ((acc[el.key] = el.diff) && acc) || acc, {} as Partial<PlayerResources>)
    handleChange(diff)
  }
)

export const PlayerMenu = observer((props: PlayerMenuProps) => {

  const [diff, setDiff] = useState({} as Partial<PlayerResources>)

  useEffect(() => {
    return resourceReaction(props.resources.playerResources, setDiff)
  }, [props.resources.playerResources])

  return (
    <div className={styles.container}>
      <div className={styles.playerResources}>
        <div className={styles.biotic}>
          {props.resources.playerResources["biotic materials"]}
          <Notification diff={diff["biotic materials"]} />
        </div>
        <div className={styles.fuel}>
          {props.resources.playerResources.fuel}
          <Notification diff={diff.fuel} />
        </div>
        <div className={styles.machinery}>
          {props.resources.playerResources.machinery}
          <Notification diff={diff.machinery} />
        </div>
        <div className={styles.minerals}>
          {props.resources.playerResources.minerals}
          <Notification diff={diff.minerals} />
        </div>
        <div className={styles.nanotechnologies}>
          {props.resources.playerResources.nanotechnologies}
          <Notification diff={diff.nanotechnologies} />
        </div>
        <div className={styles.dark}>
          {props.resources.playerResources["dark matter"]}
          <Notification diff={diff["dark matter"]} />
        </div>
        <div className={styles.energy}>
          Energy: {props.resources.energy}
        </div>
        <div className={styles.points}>TPs{props.resources.points.total}</div>
      </div>
    </div>
  );
});
