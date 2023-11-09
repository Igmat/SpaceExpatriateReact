import { makeAutoObservable } from "mobx";
import { GeneralCard } from "../Rules/card-types";

export class HandModel {
  cardsInHand = {
    takeCard: (card: GeneralCard) => {
      //  dropCard
      this.cardsInHand.cards.filter((cardInHand) => cardInHand !== card);
      return card; // не очень правильно)
    },
    placeCard: (card: GeneralCard) => {
      return card;
    },
    cards: [] as GeneralCard[],
  };

  drop = {
    takeCard: (card: GeneralCard) => {
      return card; // не очень правильно)
    },
    placeCard: (card: GeneralCard) => {
      this.drop._droppedCards.push(card.id);
      return card;
    },
    _droppedCards: [] as number[],
  };

  public tempDroppedCards: GeneralCard[] = [];

  constructor(gameId: string) {
    makeAutoObservable(this);
  }
  placeCard(card: GeneralCard): GeneralCard {
    throw new Error("Method not implemented.");
  }

  dropCard = (ind: number) => {
    //move
    const card = this.cardsInHand.cards[ind];
    card.move(this.cardsInHand, this.cardsInHand);
    return card;
  };

  takeCard(card: GeneralCard) {
    //арг был ?
    card && this.cardsInHand.cards.push(card);
    return card;
  }

  isInHand = (card: GeneralCard): boolean => {
    /*return this.cardsInHand.some(
      (handCard) => handCard.id === card.id && card.type === handCard.type
    );*/
    return true;
  };
}
