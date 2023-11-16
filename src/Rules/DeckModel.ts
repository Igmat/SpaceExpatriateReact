import { GameState } from ".";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { CardType } from "./card-types";
import { makeAutoObservable } from "mobx";
import { DropCardsPlace } from "./Places/DropCardsPlace";
import { BasicCard } from "./Cards";
import { ActiveCardsPlace } from "./Places/ActiveCardsPlace";
import { OpenedCardsPlace } from "./Places/OpenedCardPlace";
import { Deck } from "../Board/Deck";

export class DeckModel<T extends BasicCard> {
  constructor(
    public readonly type: CardType,
    public readonly cardsDefinitions: {
      [key: number]: T;
    },
    public readonly gameId: string,
    public readonly gameState: GameState
  ) {
    makeAutoObservable(this);

    const isLoaded = makeAutoSavable(
     this, gameId, `deck_${type}`,
    //   ["_activeCards" as any, "_droppedCards" as any, "_openedCard"],
    //   gameState.saveCondition
    );
    if (!isLoaded) {
    this.initialize();
    }
  }

  public activeCards = new ActiveCardsPlace(
    this.type,
    this.cardsDefinitions,
    this.gameId
  );
  public droppedCards = new DropCardsPlace(
    this.type,
    this.cardsDefinitions,
    this.gameId
  );
  public openedCard = new OpenedCardsPlace(
    this.type,
    this.cardsDefinitions,
    this.gameId
  );

  initialize = () => {
    Object.values(this.cardsDefinitions).forEach((card) =>
      card.move(this.activeCards)
    );
    this.mixCards();
    this.openCard();
  }; // переписан по новому

  openCard = () => {
    this.openedCard.cards.forEach((card) => {
      card.move(this.droppedCards);
    });
    this.topCard.move(this.openedCard);
  }; // переписан по новому

  private checkActive() {
    if (this.activeCards.isEmpty) {
      this.droppedCards.cards.forEach((card) => {
        card.move(this.activeCards);
      });
      this.mixCards();
    }
  } // переписан по новому

  get topCard (){
    this.checkActive();
    return this.activeCards.cards[0];
  };//повертає верхню карту

  private mixCards() {
    const restCards = [...this.activeCards.cards];
    while (restCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * restCards.length);
      restCards[randomIndex].move(this.activeCards);
      restCards.splice(randomIndex, 1);
    }
  } // переписан по новому
  
  dropCards = (card:T) => {
    card.move(this.droppedCards);
  };//переписан по новому

  // takeOpenedCard(): T | undefined {
  //   if (this._openedCard === undefined) return undefined;
  //   const result = this._openedCard;
  //   this._openedCard = undefined;
  //   return this.cardsDefinitions[result];
  // }

  // get openedCard(): T | undefined {
  //   if (this._openedCard !== undefined)
  //     return this.cardsDefinitions[this._openedCard];
  //   return undefined;
  // }

  // takeCard = (): T => {
  //   const idOfCard = this._activeCards.pop()!;
  //   if (this._activeCards.length === 0) {
  //     this._activeCards = this._droppedCards;
  //     this._droppedCards = [];
  //     this.mixCards();
  //   }
  //   return this.cardsDefinitions[idOfCard];
  // };



  // findCard = (card: GeneralCard) => {
  //   return card.id === this._openedCard;
  // };

  // get restCount() {
  //   return this._droppedCards.length;
  // }
}
