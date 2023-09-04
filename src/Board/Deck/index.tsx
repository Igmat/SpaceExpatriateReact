import { observer } from "mobx-react-lite";
import { DeckModel } from "../../Rules/DeckModel";
import { Card } from "../../components/Card";
import { CardDefinition } from "../../Rules/card-types";
import { HandModel } from "../../Rules/HandModel";
import { TableModel } from "../../Rules/TableModel";
import { ActionManager } from "../../Rules/ActionManager";
import { useModalService } from "../../components/ModalWindow";
import { RoundManager } from "../../Rules/RoundManager";
import { useEffect } from "react";
import { deliveryCards } from "../../Rules/CardDefinitions/delivery";
import { engineeringCards } from "../../Rules/CardDefinitions/engineering";
import { terraformingCards } from "../../Rules/CardDefinitions/terraforming";
import { militaryCards } from "../../Rules/CardDefinitions/military";
import styles from "./Deck.module.scss";

interface DeckProps {
  model: DeckModel<CardDefinition>;
  hand: HandModel;
  table: TableModel;
  action: ActionManager;
  round: RoundManager;
}

export const Deck = observer((props: DeckProps) => {

  const modalContent = useModalService()

  /*const activateCard = () => {
    if (gameState.round.current < 5 && gameState.round.phase === "active") {
      const card = props.model.takeOpenedCard();
      card && props.table.takeCard(card);
      card && gameState.round.next();
      return;
    }
    props.hand.takeCard(props.model.takeOpenedCard());
  };*/

  useEffect(() => { //сделать свой кастомный хук
    if (props.action.remaining.selectOption) {

      const onDeliveryClick = () => {
        props.action.tryBuildColony(deliveryCards[0])
      }

      const onEngineeringClick = () => {
        props.action.tryBuildColony(engineeringCards[0])
      }

      const onTerraformingClick = () => {
        props.action.tryBuildColony(terraformingCards[0])
      }
      
      const onMilitaryClick = () => {
        props.action.tryBuildColony(militaryCards[0])
      }

      const onStationClick = () => props.action.tryBuildColonyWithStationModule

      modalContent.show(
        <div className="modal">
          <div className="modalDialog" onClick={onDeliveryClick}>Drop 3 cards of Delivery Mission</div>
          <div className="modalDialog" onClick={onEngineeringClick}>Drop 3 cards of Engineering Mission</div>
          <div className="modalDialog" onClick={onTerraformingClick}>Drop 3 cards of Terraforming Mission</div>
          <div className="modalDialog" onClick={onMilitaryClick}>Drop 3 cards of Military Mission</div>
          <div className="modalDialog" onClick={onStationClick}>Drop 4 Station Modules Cards from Table</div>
          <div className="modalDialog" onClick={() => {
            props.action.endAction()
            modalContent.hide()
          }}>Do nothing</div>
        </div>
      )
    }

    return modalContent.hide

  }, [props.action.remaining.selectOption, modalContent, props.action.endAction, props.action.tryBuildColony, props.action.tryBuildColonyWithStationModule ])
 

  const onOpenedCardClick = () => {
    props.action.perform(props.model.openedCard)
  }

  return (
    <>
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${styles.open}`}
        onClick={onOpenedCardClick}
      >
        {props.model.openedCard && (
          <Card key={props.model.openedCard.id} {...props.model.openedCard} />
        )}
      </div>
      <div
        className={`${styles[props.model.type]} ${styles.deck}`}
        onClick={() => props.action.activateDeck(props.model.type)}
      />
    </>
  );
});

//1 step - выбираем миссию 
//2 step - выбираем карты
//3 step - кнопка confirm
