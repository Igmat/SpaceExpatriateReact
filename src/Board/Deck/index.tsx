import { observer } from "mobx-react-lite";
import { DeckModel } from "../../Rules/DeckModel";
import { Card, CardProps  } from "../../components/Card";
import { CardDefinition, GeneralCard } from "../../Rules/card-types";
import { HandModel } from "../../Rules/HandModel";
import { TableModel } from "../../Rules/TableModel";
import { ActionManager } from "../../Rules/ActionManager";
import { RoundManager } from "../../Rules/RoundManager";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import styles from "./Deck.module.scss";
import { useEffect, useState } from "react";

interface DeckProps {
  //model: DeckModel<GeneralCard>;
  model: any;
  
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
   // props.action.perform(props.model.openedCard);

   props.action.perform(props.model.openedCard.card);

  };


  return (
    <>
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${styles.open}`}
        onClick={onOpenCardClick}
      >
        {props.model.openedCard.card && (
          <Card
          //  key={props.model.openedCard.id}
          key={props.model.openedCard.card.id}
         // model={props.model.openedCard}
          model={props.model.openedCard.card}
          
            action={props.action} />
        )}
      </div>
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${props.isDisabled ? styles.disabled : ""}`}
        onClick={() => props.action.activateDeck(props.model.type)}
      > <p className={styles.closeDeck}> {props.model.showId} </p>  </div>
    </>
  );
});


