import { FC, useState } from "react"
import { ModalUnifiedOptions } from "../../../Rules/ModalManager"
import { BasicResource, BasicResources } from "../../../Rules/card-types"
import { GarbageResources } from "../../../Rules/ResourcesModel"
import styles from "./AdjustGarbage.module.scss"

type ResourceAdjustmentParamsType = {
    isAdditionBlocked: boolean;
    isRemovalBlocked: boolean;
}

type ResourceManipulationType<T> = {
    [K in BasicResource]: T
}

const calculateArrayDifference = (arr1: number[], arr2: number[]) =>
    arr1.reduce((acc, el, id) =>
        acc + Math.abs(el - arr2[id]
        ), 0);

export const AdjustGarbage: FC<ModalUnifiedOptions<GarbageResources>> = (props) => {

    const [resources, setResources] = useState(props.params);
    const originalResources = props.params;
    const playersCount = 4;

    const resourceDifference = calculateArrayDifference(Object.values(originalResources), Object.values(resources));

    const resourceManipulationObject: ResourceManipulationType<ResourceAdjustmentParamsType> = BasicResources.reduce((acc, resource) => {
        acc[resource] = {
            isAdditionBlocked: resourceDifference === playersCount && (originalResources[resource] <= resources[resource]),
            isRemovalBlocked: resources[resource] === 0 || (resourceDifference === playersCount && (originalResources[resource] >= resources[resource]))
        };
        return acc;
    }, {} as ResourceManipulationType<ResourceAdjustmentParamsType>);

    const handleAdd = (resource: BasicResource) => {
        if (resourceManipulationObject[resource].isAdditionBlocked) return;
        setResources({ ...resources, [resource]: resources[resource] + 1 });
    }

    const handleRemove = (resource: BasicResource) => {
        if (resourceManipulationObject[resource].isRemovalBlocked) return;
        setResources({ ...resources, [resource]: resources[resource] - 1 });
    }

    return (
        <div className={styles.container}>
            <p className={styles.headling}>Choose resources to add/remove to/from the garbage</p>
            <div className={styles.resourcesContainer}>
                {BasicResources.map((resource, id) => (
                    <div key={id} className={styles.resources}>
                        <div className={styles.wrapper}>
                            <div className={styles.changes}>{resources[resource] - originalResources[resource]}</div>
                            <div
                                className={`${resource === "biotic materials" ? styles.bioticMaterial : styles[resource]}`}
                            >
                                {resources[resource]}
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button
                                className=
                                {`${resourceManipulationObject[resource].isAdditionBlocked ?
                                    styles.disabled :
                                    styles.button}`}
                                onClick={() => handleAdd(resource)}>+</button>
                            <button
                                className=
                                {`${resourceManipulationObject[resource].isRemovalBlocked ?
                                    styles.disabled :
                                    styles.button}`}
                                onClick={() => handleRemove(resource)}>-</button>
                        </div>
                    </div>
                ))}

            </div>
            <div className={styles.counter}>Left {playersCount - resourceDifference} resources that can be changed</div>
            <div className={styles.action} onClick={() => props.onSelect(resources)}>Confirm</div>
        </div>
    )
}