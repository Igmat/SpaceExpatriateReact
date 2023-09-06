import { observer } from "mobx-react-lite";
import { DeckModel } from "../../Rules/DeckModel";
import { Card } from "../../components/Card";
import { CardDefinition } from "../../Rules/card-types";
import { HandModel } from "../../Rules/HandModel";
import { TableModel } from "../../Rules/TableModel";
import { ActionManager } from "../../Rules/ActionManager";
import styles from "./Deck.module.scss";

interface DeckProps {
  model: DeckModel<CardDefinition>;
  hand: HandModel;
  table: TableModel;
  action: ActionManager;
}

export const Deck = observer((props: DeckProps) => {

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

