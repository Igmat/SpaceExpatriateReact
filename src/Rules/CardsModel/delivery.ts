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
