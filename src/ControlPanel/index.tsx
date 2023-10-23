import { useEffect } from "react";
import { useGameState } from "../Rules";
import { useModalService } from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { DeliveryActionWindow } from "../components/ModalWindows/DeliveryActionWindow/DeliveryActionWindow";
import { TerraformingModal } from "../components/ModalWindows/TerraformingModal";
import { MillitaryModal } from "../components/ModalWindows/MillitaryModal";
import { ChooseResource } from "../components/ModalWindows/ChooseResource";
import { DeliveryResourcesModal } from "../components/ModalWindows/DeliveryActionWindow/DeliveryResourcesModal";

const modals = {
  military: MillitaryModal,
  deliveryOptions: DeliveryActionWindow,
  deliveryResources: DeliveryResourcesModal,
  terraforming: TerraformingModal,
  resources: ChooseResource,
} as const;

export const ControlPanel = observer(() => {
  const gameState = useGameState();

  const modalService = useModalService();

  useEffect(() => {
    if (!gameState.modal.type) return;    
    modalService.show(
      modals[gameState.modal.type as keyof typeof modals] as any,
      gameState.modal.onSelect as any,
      gameState.modal.params as any,
      true
    );

    return modalService.hide;
  }, [gameState.modal.type, gameState.modal.params, gameState.modal.onSelect, modalService]);

  return <></>;
});
