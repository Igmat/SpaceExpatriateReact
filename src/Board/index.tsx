import { Deck } from "./Deck"
import styles from './Board.module.scss'
import { GameState, PlayerState } from "../Rules"

export const Board = () => {
 
    return (
        <div className={styles.board}>
            <Deck model={GameState.deliveryDeck} player={PlayerState.cards}/>
            <Deck model={GameState.engineeringDeck} player={PlayerState.cards}/>
            <Deck model={GameState.terraformingDeck} player={PlayerState.cards}/>
            <Deck model={GameState.militaryDeck} player={PlayerState.cards}/>
        </div>
    )
}