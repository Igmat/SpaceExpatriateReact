import { ModalOptions } from "../../../Rules/ModalManager";
import { CardType } from "../../../Rules/card-types";
import styles from './TerraformingModal.module.scss';

export function TerraformingModal (props: ModalOptions<CardType>) {

    const onDeliveryMissionClick = () => {
        props.chooseOption("delivery")
    }

    const onEngineeringMissionClick = () => {
        props.chooseOption("engineering")
    }

    const onTerraformingMissionClick = () => {
        props.chooseOption("terraforming")
    }

    const onMilitaryMissionClick = () => {
        props.chooseOption("military")
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalDialog} onClick={onDeliveryMissionClick}>Delivery Mission</div>
            <div className={styles.modalDialog} onClick={onEngineeringMissionClick}>Engineering Mission</div>
            <div className={styles.modalDialog} onClick={onTerraformingMissionClick}>Terraforming Mission</div>
            <div className={styles.modalDialog} onClick={onMilitaryMissionClick}>Military Mission</div>
        </div>
    )
}