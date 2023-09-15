import styles from './StartWindow.module.scss'
import { NavLink } from "react-router-dom";
export const StartWindow = () => {

    return (
        <div className={styles.wrapper}>
          <NavLink to="/game"> <div className={styles.startBtn}>START GAME</div></NavLink> 
        </div>
    )
}