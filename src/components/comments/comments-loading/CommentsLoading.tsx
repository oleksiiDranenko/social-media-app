//styles
import classes from './CommentsLoading.module.css';
//custom element
import {Loading} from '../../loading/Loading'

export const CommmentsLoading = () => {

    return (
        <div className={classes.loading}>
            <Loading w='35px' h='35px'/>
        </div>
    )
}