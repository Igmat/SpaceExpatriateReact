import { observer } from "mobx-react-lite";
import { Card } from "../../components/Card";
import { HandModel } from "../../Rules/HandModel";
import { DeckManager } from "../../Rules/DeckManager";
import styles from "./Hand.module.scss";
import { ActionManager } from "../../Rules/ActionManager";


interface HandProps {
  decks: DeckManager;
  model: HandModel;
  action: ActionManager;
}

export const Hand = observer((props: HandProps) => {
 
  return (
    <div className={styles.container}>
      {props.model.cardsInHand.map((card, ind) => (
        <Card key={ind} {...card} onClick={() => props.action.activateCard(ind)} />
      ))}
    </div>
  );
});
