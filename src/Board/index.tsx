import { Deck } from "./Deck"
import styles from './Board.module.scss'
import { GameState } from "../Rules"

export const Board = () => {
    return (
        <div className={styles.board}>
            <Deck model={GameState.deliveryDeck}/>
            <Deck model={GameState.engineeringDeck}/>
            <Deck model={GameState.terraformingDeck}/>
            <Deck model={GameState.militaryDeck}/>
        </div>
    )
}