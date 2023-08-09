import styles from './Resource.module.scss';
import { Resource } from '../../card-types';

export interface ResourceComponentProps {
    type: Resource;
}

export const ResourceComponent = (props: ResourceComponentProps) => {
    return (
        <div className={`${styles[props.type]} ${styles.resource}`}>

        </div>
    )
}