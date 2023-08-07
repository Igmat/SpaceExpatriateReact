import styles from './Resource.module.scss';
import { Resource } from '../../card-types';

export const ResourceComponent = (props: Resource) => {
    return (
        <div className={`${styles[props.types]} ${styles.resource}`}>

        </div>
    )
}