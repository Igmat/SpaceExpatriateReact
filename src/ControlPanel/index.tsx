import { useEffect } from "react";
import { useGameState } from "../Rules";
import { useModalService } from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { DeliveryActionWindow } from "../components/ModalWindows/DeliveryActionWindow/DeliveryActionWindow";
import { TerraformingModal } from "../components/ModalWindows/TerraformingModal";
import { MillitaryModal } from "../components/ModalWindows/MillitaryModal";
import { ChooseResource } from "../components/ModalWindows/ChooseResource";

const modalByPhase = {
  military: <MillitaryModal />,
  delivery: <DeliveryActionWindow />,
  terraforming: <TerraformingModal />,
} as const;

export const ControlPanel = observer(() => {
  const gameState = useGameState();

  const modalService = useModalService();
  useEffect(() => {
    if (gameState.round.step === "options") {
      modalService.show(
        modalByPhase[gameState.round.phase as keyof typeof modalByPhase],
        true
      );
    }
    if (gameState.round.step === "resources") {
      modalService.show(
        <ChooseResource
          array={gameState.round.params!}
          select={(resource) => {
            gameState.round.startPerformingStep();
            if (gameState.modal.onSelect === undefined) {
              modalService.hide();
              return;
            }
            gameState.modal.onSelect(resource);
          }}
        />,
        true
      );
    }
    return modalService.hide;
  }, [gameState.round, gameState.round.step, modalService, gameState.round.phase, gameState.round.params]);

  return <></>;
});
