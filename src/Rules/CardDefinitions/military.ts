import { MilitaryCard } from "../card-types";
import { createCards } from "./createCards";

export const militaryCards = createCards<MilitaryCard>(
    "military", 
    { weapon: "fighters" }
)

//military - нужна функция, которая помогает реализовать одинаковые карты
// 4 файла с картами 
// * в компоненте Deck нужно сделать отображение открытой карты
// по клику по колоде берется закрытая карта, 
// и по клику по открытой карте забирается открытая карта 
// и открывается новая карта из колоды