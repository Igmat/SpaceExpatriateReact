import { BasicCard as BasicCard } from "../Cards";

export interface ICardPlace<T extends BasicCard> {

  takeCard(id: number): T;//откуда
  placeCard(card: T): void;//куда

}