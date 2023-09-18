import styles from './Home.module.scss'
import { NavLink } from "react-router-dom";
export const Home = () => {

    return (
        <div className={styles.wrapper}>
          <NavLink to="/game"> <div className={styles.start}>START GAME</div></NavLink> 
        </div>
    )
}