import { observer } from 'mobx-react-lite';
import { ActionManager } from '../../Rules/ActionManager';
import styles from './ConfirmButton.module.scss'

interface ConfirmButtonProps {
    action: ActionManager;
}

export const ConfirmButton = observer((props: ConfirmButtonProps) => {
    return (
        <button className={styles.confirmButton} onClick={props.action.tryNext}>Confirm</button>
    )
})