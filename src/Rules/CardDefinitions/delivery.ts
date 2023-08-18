import { DeliveryCard } from "../card-types";
import { createCards } from "./createCards";

export const deliveryCards = createCards<DeliveryCard>(
    "delivery",
    { resources: ['biotic materials', 'biotic materials'] },
    { resources: ['fuel', 'fuel'] },
    { resources: ['minerals', 'minerals'] },
    { resources: ['machinery'] },
    { resources: ['nanotechnologies'] },
)