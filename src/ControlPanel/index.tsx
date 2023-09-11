import { useEffect } from "react";
import { gameState } from "../Rules";
import { useModalService } from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { DeliveryActionWindow } from "../components/ModalWindows/DeliveryActionWindow/DeliveryActionWindow";
import { TerraformingModal } from "../components/ModalWindows/TerraformingModal";
import { MillitaryModal } from "../components/ModalWindows/MillitaryModal";
import { ChooseResource } from "../components/ModalWindows/ChooseResource";

const modalByPhase = {
  military: <MillitaryModal />,
  delivery: <DeliveryActionWindow action={gameState.action} />,
  terraforming: <TerraformingModal />,
} as const;

export const ControlPanel = observer(() => {
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
            gameState.resources.gainResource(resource);
            gameState.round.step = "performing";
          }}
        />,
        true
      );
    }
    //  console.log('im in close - ' + gameState.round.step)
    return modalService.hide;
  }, [gameState.round.step, modalService, gameState.round.phase]);

  return <></>;
});
