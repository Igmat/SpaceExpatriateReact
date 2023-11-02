import { FC, useState } from "react"
import { ModalOptionsColony } from "../../../Rules/ModalManager"
import { BasicResource, BasicResources } from "../../../Rules/card-types"
import styles from "./AdjustGarbage.module.scss"
import { GarbageResources } from "../../../Rules/ResourcesModel"

export const AdjustGarbage: FC<ModalOptionsColony<GarbageResources>> = (props) => {

    const [resources, setResources] = useState(props.params)

    const handleAdd = (resource: BasicResource) => {
        setResources({ ...resources, [resource]: resources[resource] + 1 })
    }

    const handleRemove = (resource: BasicResource) => {
        setResources({ ...resources, [resource]: resources[resource] - 1 })
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
                            {resources[resource]}
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