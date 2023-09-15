import styles from './HomePage.module.scss'
import { NavLink } from "react-router-dom";
export const HomePage = () => {

    return (
        <div className={styles.wrapper}>
          <NavLink to="/game"> <div className={styles.startBtn}>START GAME</div></NavLink> 
        </div>
    )
}