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

