import { useEffect } from "react";
import { gameState } from "../Rules";
import { useModalService } from "../components/ModalWindow";
import { observer } from "mobx-react-lite";

const modalByPhase = {
    military: <div>military options</div>,
    delivery: <div>delivery options</div>,
    terraforming: <div>terraforming options</div>,
} as const;

export const ControlPanel = observer(() => {
  const modalService = useModalService();
  useEffect(() => {
    if (gameState.round.step === "options") {
        modalService.show(modalByPhase[gameState.round.phase as keyof typeof modalByPhase], true);
      
    }
    return modalService.hide;
  },[gameState.round.step, modalService, gameState.round.phase]);

  return <></>;
});
