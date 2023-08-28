import { Deck } from "./Deck"
import styles from './Board.module.scss'
import { gameState} from "../Rules"

export const Board = () => {
 
    return (
        <div className={styles.board}>
            <Deck model={gameState.decks.delivery} hand={gameState.hand} table={gameState.table} action={gameState.action}/>
            <Deck model={gameState.decks.engineering} hand={gameState.hand} table={gameState.table} action={gameState.action}/>
            <Deck model={gameState.decks.terraforming} hand={gameState.hand} table={gameState.table} action={gameState.action}/>
            <Deck model={gameState.decks.military} hand={gameState.hand} table={gameState.table} action={gameState.action}/>
        </div>
    )
}