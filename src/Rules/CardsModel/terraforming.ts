import { makeAutoObservable } from 'mobx';
import { CardType, Resource, ResourcePrimitive } from '../card-types';
import { CardsModel } from '.';
import { GeneralCardDefinition } from '../CardDefinitions/createCards';

export class TerraformingCardModel extends CardsModel {

  constructor(
    id: number,

    type: GeneralCardDefinition,

    public  name?: string,
    public  resources?: Resource[] | ResourcePrimitive[],
    public  points?: number,
  ) {
    super(id, type); 

    //makeAutoObservable(this);
  }

}
