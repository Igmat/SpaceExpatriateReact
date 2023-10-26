import { makeAutoObservable } from 'mobx';
import { CardType, Resource, ResourcePrimitive } from '../card-types';
import { CardsModel } from '.';

export type ConectionType =  "start" | "continue" | "end";


export class EngineeringCardModel extends CardsModel {


  constructor(
    id: number,

    type: CardType,
    public connection?: ConectionType,
    public entryPoint?: Resource,
    public exitPoint?: Resource[] | ResourcePrimitive[],
    public name?: string,
    public points?: number,
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