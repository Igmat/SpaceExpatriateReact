import { gameState } from "../../Rules"
import { deliveryCards } from "../../Rules/CardDefinitions/delivery"

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
        <div className="modal">
            <div className="modalDialog" onClick={onDeliveryMissionClick}>Delivery Mission</div>
            <div className="modalDialog" onClick={onEngineeringMissionClick}>Engineering Mission</div>
            <div className="modalDialog" onClick={onTerraformingMissionClick}>Terraforming Mission</div>
            <div className="modalDialog" onClick={onMilitaryMissionClick}>Military Mission</div>
            <div className="modalDialog" onClick={gameState.action.endAction}>Do nothing</div>
        </div>
    )
}