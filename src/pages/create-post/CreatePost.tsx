import { Form } from './Form';
import classes from './CreatePost.module.css';


export const CreatePost = () => {

    return (
        <div className={classes.page}>
            <h1 className={classes.header}>Create a new post</h1>
            <Form/>
        </div>
    )
}