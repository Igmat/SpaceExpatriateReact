import { useEffect } from "react";
import { useGameState } from "../Rules";
import { useModalService } from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { DeliveryActionWindow } from "../components/ModalWindows/DeliveryActionWindow/DeliveryActionWindow";
import { TerraformingModal } from "../components/ModalWindows/TerraformingModal";
import { MillitaryModal } from "../components/ModalWindows/MillitaryModal";
import { ChooseResource } from "../components/ModalWindows/ChooseResource";

const modals = {
  military: MillitaryModal,
  delivery: DeliveryActionWindow,
  terraforming: TerraformingModal,
  resources: ChooseResource,
} as const;

export const ControlPanel = observer(() => {
  const gameState = useGameState();

  const modalService = useModalService();
  useEffect(() => {
    modalService.show(
      modals[gameState.modal.type as keyof typeof modals],
      gameState.modal.setOption,
      gameState.modal.params,
      true
    );

    return modalService.hide;
  }, [gameState.modal.type, gameState.modal.params, gameState.modal.setOption, modalService]);

  return <></>;
});
