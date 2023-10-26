import { makeAutoObservable } from 'mobx';
import { CardType } from '../card-types';
import { CardsModel } from '.';

export type WeaponType ="orbital" | "intelligence" | "fighters" | "spaceborne";

export class MilitaryCardModel extends CardsModel {
  
  constructor(
    id: number,

    public type: CardType,
    public weapon?: WeaponType,
    public  name?: string

  ) {
    super(id, type); 

    makeAutoObservable(this);
  }

}

