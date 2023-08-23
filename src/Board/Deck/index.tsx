import { DeckModel } from "../../Rules/DeckModel";
import { PlayerModel } from "../../Rules/PlayerModel";
import styles from "./Deck.module.scss";
import { Card } from "../../components/Card";
import { CardDefinition } from "../../Rules/card-types";
import { observer } from "mobx-react-lite";

interface DeckProps {
  model: DeckModel<CardDefinition>;
  player: PlayerModel; //any;
}

export const Deck = observer((props: DeckProps) => {


  return (
    <>
      <div className={`${styles[props.model.type]} ${styles.deck}`}>
        <button className={styles.takeBtn} onClick={props.model.openCard}>
          {"--->"}
        </button>
        <button
          className={styles.takeBtn}
          onClick={() => props.player.takeCard(props.model.takeCard())}
        >
          TAKE
        </button>
      </div>
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${styles.open}`}
        onClick={()=> props.player.takeCard(props.model.takeOpenedCardAndOpenNew())}
      >
        {props.model.openedCard && (
          <Card key={props.model.openedCard.id} {...props.model.openedCard} />
        )}
        
      </div>
    </>
  );
});
