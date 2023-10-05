import { colonyCards } from "../Colony/colony-cards";// не забыть удалить
import { DeliveryCard } from "../card-types";
import { createCards } from "./createCards";

export const deliveryCards = createCards<DeliveryCard>(
    "delivery",
    { resources: ['fuel', 'fuel'], quantity: 4 },
    { resources: ['fuel', 'minerals'], quantity: 4 },
    { resources: ['fuel', 'biotic materials'], quantity: 4 },
    { resources: ['minerals', 'minerals'], quantity: 4 },
    { resources: ['minerals', 'biotic materials'], quantity: 4 },
    { resources: ['biotic materials', 'biotic materials'], quantity: 4 },
    { resources: [ 'machinery'], quantity: 4 },
    { resources: [ 'nanotechnologies'], quantity: 4 },
)

console.log(colonyCards) 