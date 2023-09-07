import { gameState } from "../../../Rules"
import styles from './TerraformingModal.module.scss'
export const TerraformingModal = () => {

    const onDeliveryMissionClick = () => {
        gameState.action.setMissionType("delivery")
    }

    const onEngineeringMissionClick = () => {
        gameState.action.setMissionType("engineering")
    }

    const onTerraformingMissionClick = () => {
        gameState.action.setMissionType("terraforming")
    }

    const onMilitaryMissionClick = () => {
        gameState.action.setMissionType("military")
    }

    return (
        <div className={styles.modal}>
          
            <div className={styles.modalDialog} onClick={onDeliveryMissionClick}>Delivery Mission</div>
            <div className={styles.modalDialog} onClick={onEngineeringMissionClick}>Engineering Mission</div>
            <div className={styles.modalDialog}  onClick={onTerraformingMissionClick}>Terraforming Mission</div>
            <div className={styles.modalDialog}  onClick={onMilitaryMissionClick}>Military Mission</div>
        
      
        </div>
    )
}