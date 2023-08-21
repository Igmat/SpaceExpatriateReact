import { Deck } from "./Deck"
import styles from './Board.module.scss'
import { GameState } from "../Rules"

export const Board = () => {
    return (
        <div className={styles.board}>
            <Deck type="delivery" onClosedClick={GameState.deliveryDeck.takeCard} onOpenClick={GameState.deliveryDeck.takeOpenedCardAndOpenNew}/>
            <Deck type="engineering" onClosedClick={GameState.engineeringDeck.takeCard} onOpenClick={GameState.engineeringDeck.takeOpenedCardAndOpenNew}/>
            <Deck type="terraforming" onClosedClick={GameState.terraformingDeck.takeCard} onOpenClick={GameState.terraformingDeck.takeOpenedCardAndOpenNew}/>
            <Deck type="military" onClosedClick={GameState.militaryDeck.takeCard} onOpenClick={GameState.militaryDeck.takeOpenedCardAndOpenNew}/>
        </div>
    )
}