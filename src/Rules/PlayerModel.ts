import { CardDefinition, CardType } from "./card-types";
import { makeAutoObservable } from "mobx";

export class PlayerModel{
constructor(){
  makeAutoObservable(this);
}
  playerCards:  CardDefinition [] = [];

  takeCard = (card?: CardDefinition) => {
    card && this.playerCards.push(card);
  };

  dropCard = (arg: number) => {
    const index = this.playerCards.findIndex(ind => ind.id === arg);
    index !== -1 && this.playerCards.splice(index, 1);
    return arg
  };
}

//https://mobx.js.org/README.html
//Сделать отображение руки из актуальных данных
//При взаимодействии с колодой логичным образом менять "руку"
//Из колоды в руку, из руки в сброс
//Описать полноценно delivery
//(создать класс для "Руки")
