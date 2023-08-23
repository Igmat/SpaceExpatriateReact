import styles from "./Hand.module.scss";
import { CardDefinition } from "../../Rules/card-types";
import { Card } from "../../components/Card";

import { observer } from "mobx-react-lite";
import { DeckModel } from "../../Rules/DeckModel";
import { PlayerModel } from "../../Rules/PlayerModel";

interface HandProps {
  state: any,//DeckModel<CardDefinition>;
  player: PlayerModel; 
}

export const Hand = observer((props: HandProps) => {
/*
  const drop = (type: string, id: number) => {
    props.state[`${type}Deck`].dropCards(props.player.dropCard(id))
  } */
  return (
    <div className={styles.container}>
      {props.player.playerCards &&
        props.player.playerCards.map((card) => (
         <div onClick={() => props.state[`${card.type}Deck`].dropCards(props.player.dropCard(card.id))}>
            {card.id} <Card key={card.id} {...card} />{" "}
          </div>
        ))}
    </div>
  );
});
