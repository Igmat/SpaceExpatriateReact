import { ActionManager } from '../../Rules/ActionManager';
import { ResourcesModel } from '../../Rules/ResourcesModel';
import styles from './ConfirmButton.module.scss'

interface ConfirmButtonProps {
    action: ActionManager;
    resources: ResourcesModel;

}

export const ConfirmButton= (props: ConfirmButtonProps) => {
    const confirmAction = () => {
props.action.dropCards()
props.resources.currentTotalPoints()
    }
    return (
        <button className={styles.confirmButton} onClick={()=>confirmAction()}>Confirm</button>
    )
}