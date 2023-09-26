import { useGameState } from "../../../Rules"
import styles from './TerraformingModal.module.scss'
export const TerraformingModal = () => {

    const gameState = useGameState();

    const onDeliveryMissionClick = () => {
        gameState.action.select("delivery")
    }

    const onEngineeringMissionClick = () => {
        gameState.action.select("engineering")
    }

    const onTerraformingMissionClick = () => {
        gameState.action.select("terraforming")
    }

    const onMilitaryMissionClick = () => {
        gameState.action.select("military")
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