import { FC, useState } from "react"
import { ModalOptionsColony } from "../../../Rules/ModalManager"
import { BasicResource, BasicResources } from "../../../Rules/card-types"
import { GarbageResources } from "../../../Rules/ResourcesModel"
import styles from "./AdjustGarbage.module.scss"

export const AdjustGarbage: FC<ModalOptionsColony<GarbageResources>> = (props) => {

    const playersCount = 4;

    const [resources, setResources] = useState(props.params);
    const [allowedChangesCountState, setAllowedChangesCountState] = useState(playersCount);

    const handleAdd = (resource: BasicResource) => {
        
        if (allowedChangesCountState > 0 && allowedChangesCountState <= 4) {
            setAllowedChangesCountState(allowedChangesCountState - 1)
            setResources({ ...resources, [resource]: resources[resource] + 1 });
        } else {
            setResources({ ...resources, [resource]: resources[resource] })
        }
    }

    const handleRemove = (resource: BasicResource) => {
        
        if (allowedChangesCountState > 0 && allowedChangesCountState <= 4) {
            setResources({ ...resources, [resource]: resources[resource] - 1 });
            setAllowedChangesCountState(allowedChangesCountState - 1)
        } else {
            setResources({ ...resources, [resource]: resources[resource] })
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.headling}>Choose resources to add/remove to/from the garbage</p>
            <div className={styles.resourcesContainer}>
                {BasicResources.map((resource, id) => (
                    <div key={id} className={styles.resources}>
                        <div
                            className={`${resource === "biotic materials" ? styles.bioticMaterial : styles[resource]}`}
                        >
                            {resources[resource] > 0 ? resources[resource] : 0}
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={() => handleAdd(resource)}>+</button>
                            <button className={styles.button} onClick={() => handleRemove(resource)}>-</button>
                        </div>
                    </div>
                ))}

            </div>
            <div className={styles.action} onClick={() => props.onSelect(resources)}>Confirm</div>
        </div>
    )
}