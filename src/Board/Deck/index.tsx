import { observer } from "mobx-react-lite";
import { DeckModel } from "../../Rules/DeckModel";
import { Card } from "../../components/Card";
import { CardDefinition } from "../../Rules/card-types";
import { HandModel } from "../../Rules/HandModel";
import { TableModel } from "../../Rules/TableModel";
import { ActionManager } from "../../Rules/ActionManager";
import { RoundManager } from "../../Rules/RoundManager";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import styles from "./Deck.module.scss";

interface DeckProps {
  model: DeckModel<CardDefinition>;
  hand: HandModel;
  table: TableModel;
  action: ActionManager;
  round: RoundManager;
  resources: ResourcesModel;
  isDisabled: boolean;
}

export const Deck = observer((props: DeckProps) => {

  //console.log(props.model.openedCard)
  const onOpenCardClick = () => {
    props.action.perform(props.model.openedCard);
  };
  return (
    <>
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${styles.open}`}
        onClick={onOpenCardClick}
      >
        {props.model.openedCard && (
          <Card
            key={props.model.openedCard.id}
            {...props.model.openedCard}
            action={props.action} />
        )}
      </div>
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${props.isDisabled ? styles.disabled : ""}`}
        onClick={() => props.action.activateDeck(props.model.type)}
      />
    </>
  );
});
