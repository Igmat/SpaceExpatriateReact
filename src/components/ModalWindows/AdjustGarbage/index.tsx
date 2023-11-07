import { FC, useState } from "react"
import { ModalOptionsColony } from "../../../Rules/ModalManager"
import { BasicResource, BasicResources } from "../../../Rules/card-types"
import { GarbageResources } from "../../../Rules/ResourcesModel"
import styles from "./AdjustGarbage.module.scss"

const findDiff = (arr1: number[], arr2: number[]) => {
    return arr1.reduce((acc, el, id) => {
        return acc + Math.abs(el - arr2[id]);
    }, 0)
}

export const AdjustGarbage: FC<ModalOptionsColony<GarbageResources>> = (props) => {

    const [resources, setResources] = useState(props.params);
    const originalResources = props.params;
    const playersCount = 4;

    let counter = findDiff(Object.values(originalResources), Object.values(resources));

    const handleAdd = (resource: BasicResource) => {
        if (counter < playersCount || resources[resource] < originalResources[resource]) {
            setResources({ ...resources, [resource]: resources[resource] + 1 });
        }
    }
    const handleRemove = (resource: BasicResource) => {

        if ((resources[resource] > 0 && counter < playersCount) || resources[resource] > originalResources[resource]) {
            setResources({ ...resources, [resource]: resources[resource] - 1 });
        }
    }

    console.log(counter);


    return (
        <div className={styles.container}>
            <p className={styles.headling}>Choose resources to add/remove to/from the garbage</p>
            <div className={styles.resourcesContainer}>
                {BasicResources.map((resource, id) => (
                    <div key={id} className={styles.resources}>
                        <div className={styles.wrapper}>
                            <div className={styles.changes}>{Math.abs(originalResources[resource] - resources[resource])}</div>
                            <div
                                className={`${resource === "biotic materials" ? styles.bioticMaterial : styles[resource]}`}
                            >
                                {resources[resource]}
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button
                                className=
                                {`
                                    ${counter === playersCount &&
                                        (originalResources[resource] === resources[resource] || originalResources[resource] < resources[resource]) ?
                                            styles.disabled :
                                                styles.button}
                                `}
                                onClick={() => handleAdd(resource)}>+</button>
                            <button
                                className=
                                {`
                                    ${resources[resource] === 0 ||
                                        (counter === playersCount &&
                                            (originalResources[resource] > resources[resource] || originalResources[resource] === resources[resource])) ?
                                                styles.disabled :
                                                    styles.button}
                                `}

                                onClick={() => handleRemove(resource)}>-</button>
                        </div>
                    </div>
                ))}

            </div>
            <div className={styles.counter}>Left {playersCount - counter} resources that can be changed</div>
            <div className={styles.action} onClick={() => props.onSelect(resources)}>Confirm</div>
        </div>
    )
}