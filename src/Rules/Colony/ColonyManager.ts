import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints } from "./ColonyDeckModel";
import { CardType, ColonyCard, EngineeringCard } from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";

const cardEngeneering = {
  id: 111,
  type: 'engineering',
  connection: 'end',
  exitPoint: ['fuel', 'biotic materials', 'minerals'],
  points: 2,
  name: 'HELIOSTAT DESERT',
  isSelected: false 
} as EngineeringCard & { isSelected: boolean }

export class ColonyManager {
  constructor(private readonly gameId: string, private readonly table: TableModel) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "colony", [
      "colonies",
    ])
  }

  colonies: ColonyCard[] = [];
 
  effects = {
    selectDeliveryStation: () => { },
    adjustGarbage: () => { },
    pushEngineering: () => {this.table.engineering.push(cardEngeneering) 
      return ()=>{this.table.engineering.pop()}},
  };
   

  takeColonyCard = (card: ColonyCardWithPoints) => {
    this.colonies.push(card);
  };

  beforePerform = (card: any) => {
    const aplicable = this.findAplicableColonyCards(card.type, "before");
    aplicable.forEach((colony: ColonyCard) => {
      if (colony.activate !== undefined) {
        // colony.activate();
      }
      if (colony.effects !== undefined) {
        colony.effects.forEach((effect) => {
          this.effects[effect]();
        });
      }
    });
  };

  findAplicableColonyCards = (
    CardType: CardType,
    whenIsActivated: string
  ): ColonyCard[] => {
    // проверить. праивльно ли работает метод
    return this.colonies.filter(
      (colony) =>
        colony.whenIsActivated === whenIsActivated &&
        colony.mutateAction === CardType
    );
  };

}
