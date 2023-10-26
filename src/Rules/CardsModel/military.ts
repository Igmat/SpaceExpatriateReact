import { makeAutoObservable } from 'mobx';
import { CardType } from '../card-types';
import { CardsModel } from '.';
import { GeneralCardDefinition } from '../CardDefinitions/createCards';

export type WeaponType ="orbital" | "intelligence" | "fighters" | "spaceborne";

export class MilitaryCardModel extends CardsModel {
  
  constructor(
    id: number,

    type: GeneralCardDefinition,

    public weapon?: WeaponType,
    public  name?: string

  ) {
    super(id, type); 

   // makeAutoObservable(this);
  }

}

