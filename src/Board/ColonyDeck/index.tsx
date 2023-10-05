import { ColonyModel } from '../../Rules/Colony/ColonyModel';
import { ColonyCard } from '../../Rules/card-types';
import { CCard } from '../../components/ColonyCard';
import styles from './ColonyDeck.module.scss'
import { observer } from "mobx-react-lite";

interface ColonyDeck {
    colony: ColonyModel<ColonyCard>
}

export const ColonyDeck = observer(() => {

    return (
      <div className={styles.colonyCards}>
{/*props.colony.openedCard && (<CCard {...props.colony.openedCard}/>)*/}
<CCard />
<CCard />

<CCard />

      </div>
    );
});
