import { GeneralCard } from "../card-types";

export interface ICardPlace {

    takeCard(card?: GeneralCard): GeneralCard | undefined;//откуда
    placeCard(card: GeneralCard): void;//куда

  }