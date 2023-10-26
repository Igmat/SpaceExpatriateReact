import { makeAutoObservable } from 'mobx';
import { CardType, Resource, ResourcePrimitive } from '../card-types';
import { CardsModel } from '.';
import { GeneralCardDefinition } from '../CardDefinitions/createCards';

export class DeliveryCardModel extends CardsModel {

  constructor(
    id: number,
    type: GeneralCardDefinition,
    public resources?: Resource[] | ResourcePrimitive[]

  ) {
    super(id, type); 

    //makeAutoObservable(this);
  }

}
