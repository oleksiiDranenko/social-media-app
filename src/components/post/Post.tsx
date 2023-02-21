import classes from './Post.module.css';

interface PostInterface {
    username: string,
    userPhoto: string,
    value: string
}

export const Post = (props: PostInterface) => {
    return (
        <div className={classes.post}>
            <div className={classes.userInfo}>
                <img 
                    src={props.userPhoto}
                    alt='user profile photo'
                    className={classes.userPhoto}
                />
                <span className={classes.username}>{props.username}</span>
            </div>
            <div className={classes.postValue}>
                {props.value}
            </div>
        </div>
    )
}