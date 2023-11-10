import { GeneralCard, CardType } from "./card-types";
import { makeAutoObservable } from "mobx";

export class DeckModel<T extends GeneralCard> {
  constructor(
    public readonly type: CardType,
    private readonly cardsDefinitions: { [key: number]: T }, //GenerealCard?
    gameId: string
  ) {
    makeAutoObservable(this);

    this.initialize();
  }
  takeCard(card?: GeneralCard | undefined): GeneralCard {
    console.log("Method not implemented takeCard in . DeckModel");
    return card!;
  }

  initialize = () => {
    this.active.cards = this.cardsDefinitions;
    this.mixCards();
    this.openCard();
  };

  openedCard = {//открытая колода = new Place
    takeCard: (card: T) => {
      const result = this.openedCard.card!;
      this.openedCard = { ...this.openedCard, card: undefined };
      return result;
    },
    placeCard: (card: T) => {
      this.openedCard = { ...this.openedCard, card };
      return card;
    },
    card: undefined as T | undefined,
  };

  drop = {
    takeCard: (card: T) => {
      const index = this.drop._droppedCards.findIndex(
        (droppedCard) => droppedCard.id === card.id
      );

      if (index !== -1) {
        const removedCard = this.drop._droppedCards.splice(index, 1)[0];
        return removedCard;
      }

      return card;
      // не очень правильно)
    },
    placeCard: (card: T) => {
      this.drop._droppedCards.push(card);
      return card;
    },
    _droppedCards: [] as T[],
  };

  active = {//закрытая колода
    takeCard: () => {
      const keys = Object.keys(this.active.cards);
      const cardA = this.active.cards[keys[0]];
      if (keys.length === 1) {
        this.active.cards = this.drop._droppedCards;
        this.drop._droppedCards = [];
        this.mixCards();
        console.log("i mix cards");
      }
      delete this.active.cards[keys[0]];
      return cardA;
    },
    placeCard: (card: T) => {
      return card;
    },
    cards: {} as { [key: number]: T },
  };

  openCard = () => {
    this.openedCard.card !== undefined &&
      this.openedCard.card.move(this.openedCard, this.drop);
    const keys = Object.keys(this.active.cards);
    this.active.cards[keys[0]].move(this.active, this.openedCard);
  };

  private mixCards() {
    const keys = Object.keys(this.active.cards);
    for (let i = keys.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.active.cards[keys[i]], this.active.cards[keys[j]]] = [
        this.active.cards[keys[j]],
        this.active.cards[keys[i]],
      ];
    }

    return this.active.cards;
  }

  findCard = (card: T) => {
    // return card.id === this.openedCard?.id;
    // return  card.id === this.openedCard?.takeCard(card).id;
  };
  get showId() {
    const keys = Object.keys(this.active.cards);
    const card = this.active.cards[keys[0]];
    return card && card.id;
  }

  get restCount() {
    return this.drop._droppedCards.length;
  }
}
