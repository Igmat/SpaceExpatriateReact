import { makeAutoObservable } from "mobx";
import { GeneralCard } from "../Rules/card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { DeliveryCard } from "./Cards/delivery";
import { EngineeringCard } from "./Cards/engineering";
import { MilitaryCard } from "./Cards/military";
import { TerraformingCard } from "./Cards/terraforming";

export class HandModel{
  public cardsInHand: GeneralCard[] = [];
  public tempDroppedCards: GeneralCard[] = [];

  constructor(gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "hand", ["cardsInHand", "tempDroppedCards"]);
  }

  dropCard = (ind: number) => {
    const card = this.cardsInHand[ind];
    this.cardsInHand.splice(ind, 1); //вырезаем карту из руки
    return card;
  };

  takeCard(card?: GeneralCard) {
    card && this.cardsInHand.push(card);
  }

  isInHand = (card: GeneralCard): boolean => {
    return this.cardsInHand.some(
      (handCard) => handCard.id === card.id && card.type === handCard.type
    );
  };
/*
  isInHand = (id: number): boolean => {
    return this.cardsInHand.some(
      (handCard) => handCard.id === id && card.type === handCard.type
    );
  };**/
}
