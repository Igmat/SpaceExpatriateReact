import { GeneralCard } from "../card-types";

export interface ICardPlace {

    takeCard(card?: GeneralCard): GeneralCard;//откуда
    placeCard(card: GeneralCard): GeneralCard;//куда

  }