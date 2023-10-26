import { makeAutoObservable } from 'mobx';
import { CardType, Resource, ResourcePrimitive } from '../card-types';
import { CardsModel } from '.';

export class DeliveryCardModel extends CardsModel {

  constructor(
    id: number,
    type: CardType,
    public resources?: Resource[] | ResourcePrimitive[]

  ) {
    super(id, type); 

    makeAutoObservable(this);
  }

}

/*
export interface GeneralCardDefinition {
  id: number;
  type: CardType;
  name?: string;
  resources?: Resource[] | ResourcePrimitive[];
  points?: number;
  connection?: "start" | "continue" | "end";
  entryPoint?: Resource;
  exitPoint?: Resource[] | ResourcePrimitive[];
  weapon?: "orbital" | "intelligence" | "fighters" | "spaceborne";
}

*/