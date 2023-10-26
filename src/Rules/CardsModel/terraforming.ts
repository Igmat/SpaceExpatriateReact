import { makeAutoObservable } from 'mobx';
import { CardType, Resource, ResourcePrimitive } from '../card-types';
import { CardsModel } from '.';

export class TerraformingCardModel extends CardsModel {

  constructor(
    id: number,

    public  type: CardType,
    public  name?: string,
    public  resources?: Resource[] | ResourcePrimitive[],
    public  points?: number,
  ) {
    super(id, type); 

    makeAutoObservable(this);
  }

}
