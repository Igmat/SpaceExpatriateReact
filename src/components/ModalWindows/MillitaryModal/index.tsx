import React from "react";
import styles from "./Military.module.scss";
import { useGameState } from "../../../Rules";



export const MillitaryModal = () => {
  const gameState = useGameState();

  const handleOption = (option:string) => {
    gameState.action.select(option);
}
  return (
    <div className={styles.modal}>
      <div className={styles.modalDialog} onClick={()=>handleOption("exploration")}>Exploration</div>
      <div className={styles.modalDialog} onClick={()=>handleOption("political")}>Political Pressure</div>
    </div>
  );
};
