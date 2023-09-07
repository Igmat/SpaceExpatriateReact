import { ActionManager } from "../../Rules/ActionManager";
import styles from "./ResetButton.module.scss";

interface ResetButtonProps {
  action: ActionManager;
}

export const ResetButton = (props: ResetButtonProps) => {
  return (
    <button className={styles.resetButton} onClick={props.action.resetActions}>
      Reset
    </button>
  );
};
