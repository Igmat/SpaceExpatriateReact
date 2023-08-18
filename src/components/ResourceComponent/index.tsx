import styles from './Resource.module.scss';
import { Resource } from '../../Rules/card-types';
import { log } from 'console';

export interface ResourceComponentProps {
    type: Resource;
}

export const ResourceComponent = (props: ResourceComponentProps) => {
    const  normalisedType = props.type.split(' ').join('-');
    return (
        <div className={`${styles[normalisedType]} ${styles.resource}`}>

        </div>
    )
}