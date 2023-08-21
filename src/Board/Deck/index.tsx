import { DeckModel } from "../../Rules/DeckModel";
import styles from "./Deck.module.scss";
import { Card } from "../../components/Card";
import { CardDefinition } from "../../Rules/card-types";
import { observer } from "mobx-react-lite";

interface DeckProps {
  model: DeckModel<CardDefinition>;
}

export const Deck = observer((props: DeckProps) => {
  return (
    <>
      <div
        className={`${styles[props.model.type]} ${styles.deck}`}
        onClick={props.model.takeCard}
      ></div>
      <div
        className={`${styles[props.model.type]} ${styles.deck} ${styles.open}`}
        onClick={props.model.takeOpenedCardAndOpenNew}
      >
        {props.model.openedCard && <Card {...props.model.openedCard} />}
      </div>
    </>
  );
});
