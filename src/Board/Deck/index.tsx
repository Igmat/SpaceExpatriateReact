import { observer } from "mobx-react-lite";
import { DeckModel } from "../../Rules/DeckModel";
import { Card } from "../../components/Card";
import { CardDefinition } from "../../Rules/card-types";
import { HandModel } from "../../Rules/HandModel";
import styles from "./Deck.module.scss";
import { TableModel } from "../../Rules/TableModel";
import { ActionManager } from "../../Rules/ActionManager";

interface DeckProps {
  model: DeckModel<CardDefinition>;
  hand: HandModel;
  table: TableModel;
  action: ActionManager;
}

export const Deck = observer((props: DeckProps) => {
  /*const activateCard = () => {
    if (gameState.round.current < 5 && gameState.round.phase === "active") {
      const card = props.model.takeOpenedCard();
      card && props.table.takeCard(card);
      card && gameState.round.next();
      return;
    }
    props.hand.takeCard(props.model.takeOpenedCard());
  };*/

  return (
    <>
      <div
        className={`${styles[props.model.type]} ${styles.deck}`}
        onClick={() => props.action.activateDeck(props.model.type)}
      />
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${styles.open}`}
        onClick={() => props.action.perform(props.model.openedCard)}
      >
        {props.model.openedCard && (
          <Card key={props.model.openedCard.id} {...props.model.openedCard} />
        )}
      </div>
    </>
  );
});
