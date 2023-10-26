import { makeAutoObservable } from 'mobx';
import { CardType, Resource, ResourcePrimitive } from '../card-types';
import { CardsModel } from '.';
import { GeneralCardDefinition } from '../CardDefinitions/createCards';

export type ConectionType =  "start" | "continue" | "end";


export class EngineeringCardModel extends CardsModel {


  constructor(
    id: number,

    type: GeneralCardDefinition,

    public connection?: ConectionType,
    public entryPoint?: Resource,
    public exitPoint?: Resource[] | ResourcePrimitive[],
    public name?: string,
    public points?: number,
  ) {
    super(id, type); 

   // makeAutoObservable(this);
  }

}

