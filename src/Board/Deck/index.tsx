import styles from './Deck.module.scss'

interface DeckProps {
    type: 'delivery' | 'engineering' | 'terraforming' | 'military'
}


export const Deck = (props: DeckProps) => {
    return (
        <div className={`${styles[props.type]} ${styles.deck}`}>

        </div>
    )
}