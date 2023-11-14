import { BasicCard as BasicCard } from "../Cards";

export interface ICardPlace<T extends BasicCard, K> {

  takeCard(card: K): T;//откуда
  placeCard(card: K): void;//куда

}