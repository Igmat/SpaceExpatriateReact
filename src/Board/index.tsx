import { Deck } from "./Deck"
import styles from './Board.module.scss'
import { gameState} from "../Rules"
import { ResourcesDeck } from "./ResourcesDeck"

export const Board = () => {
 
    return (
        <div className={styles.container}>
            < ResourcesDeck />
            <div  className={styles.board}>
            <Deck model={gameState.decks.delivery} hand={gameState.hand} round={gameState.round} table={gameState.table} action={gameState.action}/>
            <Deck model={gameState.decks.engineering} hand={gameState.hand} round={gameState.round} table={gameState.table} action={gameState.action}/>
            <Deck model={gameState.decks.terraforming} hand={gameState.hand} round={gameState.round} table={gameState.table} action={gameState.action}/>
            <Deck model={gameState.decks.military} hand={gameState.hand} round={gameState.round} table={gameState.table} action={gameState.action}/>
            </div>

        </div>
    )
}