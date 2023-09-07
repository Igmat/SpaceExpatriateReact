import { ActionManager } from '../../Rules/ActionManager';
import { ResourcesModel } from '../../Rules/ResourcesModel';
import { RoundManager } from '../../Rules/RoundManager';
import { TableModel } from '../../Rules/TableModel';
import styles from './ConfirmButton.module.scss'

interface ConfirmButtonProps {
    table: TableModel;
    action: ActionManager;
    round: RoundManager;
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