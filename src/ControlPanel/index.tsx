import { useEffect } from "react";
import { gameState } from "../Rules";
import { useModalService } from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { DeliveryActionWindow } from "../components/ModalWindows/DeliveryActionWindows/DeliveryActionWindow/DeliveryActionWindow";
import { TerraformingModal } from "./TerraformingModal";

const modalByPhase = {
  military: <div>military options</div>,
  delivery: (
    <DeliveryActionWindow
      action={gameState.action}
      resources={gameState.resources}
      round={gameState.round}

    />

  ),

  terraforming:<TerraformingModal/>,
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
 //  console.log('im in close - ' + gameState.round.step)
    return modalService.hide;
  }, [gameState.round.step, modalService, gameState.round.phase]);

  return <></>;
});
