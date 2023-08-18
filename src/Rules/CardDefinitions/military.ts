import { MilitaryCard } from "../card-types";
import { createCards } from "./createCards";

export const militaryCards = createCards<MilitaryCard>(
    "military", 
    { weapon: "fighters" }
)

//military - нужна функция, которая помогает реализовать одинаковые карты
