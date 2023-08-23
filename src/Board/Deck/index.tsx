import { observer } from "mobx-react-lite";
import { DeckModel } from "../../Rules/DeckModel";
import { Card } from "../../components/Card";
import { CardDefinition } from "../../Rules/card-types";
import { HandModel } from "../../Rules/HandModel";
import styles from "./Deck.module.scss";

interface DeckProps {
  model: DeckModel<CardDefinition>;
  hand: HandModel
}

export const Deck = observer((props: DeckProps) => {


  return (
    <>
      <div
        className={`${styles[props.model.type]} ${styles.deck}`}
        onClick={()=>props.hand.takeCard(props.model.takeCard())}
      />
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${styles.open}`}
        onClick={()=>props.hand.takeCard(props.model.takeOpenedCardAndOpenNew())}
      >
        {props.model.openedCard && (
          <Card key={props.model.openedCard.id} {...props.model.openedCard} />
        )}
        
      </div>
    </>
  );
});
