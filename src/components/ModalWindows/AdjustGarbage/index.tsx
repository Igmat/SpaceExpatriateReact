import { FC, useEffect, useState } from "react"
import { ModalOptionsColony } from "../../../Rules/ModalManager"
import { BasicResource, BasicResources } from "../../../Rules/card-types"
import { GarbageResources } from "../../../Rules/ResourcesModel"
import styles from "./AdjustGarbage.module.scss"

const findDiff = (arr1: number[], arr2: number[]) => {
    let diff: number = 0;
    arr1.forEach((el, id) => {
        diff += Math.abs(el - arr2[id]);
    })
    return diff;
}

export const AdjustGarbage: FC<ModalOptionsColony<GarbageResources>> = (props) => {

    const [resources, setResources] = useState(props.params);
    const [counter, setCounter] = useState(0);
    const originalResources = props.params;
    const playersCount = 4;

    useEffect(() => {
        const diff = findDiff(Object.values(originalResources), Object.values(resources))
        setCounter(diff);

    }, [originalResources, resources]);
   
    const handleAdd = (resource: BasicResource) => {
        if (counter < playersCount) {
           setResources({ ...resources, [resource]: resources[resource] + 1 });
        }       
    }
    const handleRemove = (resource: BasicResource) => {
        if (resources[resource] > 0) {
            setResources({ ...resources, [resource]: (counter <= playersCount ? resources[resource] - 1 : resources[resource])});
        }
    }

    console.log(counter);
    

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