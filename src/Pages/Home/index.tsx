import styles from "./Home.module.scss";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const Home = () => {
  const gameId = uuidv4();
  return (
    <div className={styles.wrapper}>
      <NavLink to={`/game/${gameId}`}>
        <div className={styles.start}>START GAME</div>
      </NavLink>
      <NavLink to={`/loadgame`}>
        <div className={styles.start}>LOAD GAME</div>
      </NavLink>
    </div>
  );
};
