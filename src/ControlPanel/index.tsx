import { FC, useEffect } from "react";
import { useGameState } from "../Rules";
import { useModalService } from "../components/ModalWindow";
import { observer } from "mobx-react-lite";
import { DeliveryActionWindow } from "../components/ModalWindows/DeliveryActionWindow/DeliveryActionWindow";
import { TerraformingModal } from "../components/ModalWindows/TerraformingModal";
import { MillitaryModal } from "../components/ModalWindows/MillitaryModal";
import { ChooseResource } from "../components/ModalWindows/ChooseResource";
import { DeliveryResourcesModal } from "../components/ModalWindows/DeliveryActionWindow/DeliveryResourcesModal";
import { ModalVariousOptions } from "../Rules/ModalManager";
import { AdjustGarbage } from "../components/ModalWindows/AdjustGarbage";
import { BlackMarketModal } from "../components/ModalWindows/BlackMarketModal";

const modals = {
  military: MillitaryModal,
  deliveryOptions: DeliveryActionWindow,
  deliveryResources: DeliveryResourcesModal,
  blackMarket: BlackMarketModal,
  terraforming: TerraformingModal,
  resources: ChooseResource,
  adjustGarbage: AdjustGarbage,
} as const;

export type ModalType = keyof typeof modals;

export const ControlPanel = observer(() => {
  const gameState = useGameState();

  const modalService = useModalService();

  useEffect(() => {
    if (!gameState.modal.type || !gameState.modal.onSelect || !gameState.modal.params) return;
    modalService.show(
      modals[gameState.modal.type] as FC<ModalVariousOptions<unknown>>,
      gameState.modal.onSelect,
      gameState.modal.params,
      true
    );

    return modalService.hide;
  }, [gameState.modal.type, gameState.modal.params, gameState.modal.onSelect, modalService]);

  return <></>;
});
