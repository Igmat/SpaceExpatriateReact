import { makeAutoObservable } from 'mobx';
import { CardType, Trigger } from '../card-types';
import { CardsModel } from '.';
import { GeneralCardDefinition } from '../CardDefinitions/createCards';

export class ColonyCardModel extends CardsModel {

  constructor(
    id: number,
    type: GeneralCardDefinition,
    public  benefit?: string,
    public  mutateAction?: CardType,
    public  name?: string,
    public  data?: unknown,
    public  players?: number,
    public  before?: Trigger,
    public  after?: Trigger,
    public   during?: Trigger
  ) {
    super(id, type); 

  //  makeAutoObservable(this);
  }

}

