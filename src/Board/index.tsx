import { Deck } from "./Deck"
import styles from './Board.module.scss'

export const Board = () => {
    return (
        <div className={styles.board}>
            <Deck type="delivery"/>
            <Deck type="engineering"/>
            <Deck type="terraforming"/>
            <Deck type="military"/>
        </div>
    )
}