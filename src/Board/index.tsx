import { Deck } from "./Deck"
import styles from './Board.module.scss'
import { GameState} from "../Rules"

export const Board = () => {
 
    return (
        <div className={styles.board}>
            <Deck model={GameState.decks.delivery} hand={GameState.hand}/>
            <Deck model={GameState.decks.engineering} hand={GameState.hand}/>
            <Deck model={GameState.decks.terraforming} hand={GameState.hand}/>
            <Deck model={GameState.decks.military} hand={GameState.hand}/>
        </div>
    )
}