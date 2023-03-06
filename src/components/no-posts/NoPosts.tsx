//styles
import classes from './NoPosts.module.css';
//link
import { Link } from 'react-router-dom';

export const NoPosts = () => {
    return (
        <div className={classes.div}>
            <p className={classes.par}>No posts yet</p>
            <Link to='/create-post' className={classes.link}>Create post</Link>
        </div>
    )
}