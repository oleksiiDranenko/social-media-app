import classes from './Post.module.css';
import optionsIcon from '../../icons/options.png'

interface PostInterface {
    username: string,
    userPhoto: string,
    value: string,
    date: string
}

export const Post = (props: PostInterface) => {
    return (
        <div className={classes.post}>
            <div className={classes.userInfo}>

                <div className={classes.user}>
                    <img 
                        src={props.userPhoto}
                        alt='user profile photo'
                        className={classes.userPhoto}
                    />
                    <span className={classes.username}>{props.username}</span>
                </div>

                <div className={classes.options}>
                    <button className={classes.optionsButton}>
                        <img 
                            src={optionsIcon}
                            className={classes.optionsIcon}
                        />
                    </button>
                </div>

            </div>
            <div className={classes.postValue}>
                {props.value}
            </div>
            <div className={classes.postDate}>
                {props.date?.substring(0,5)}
            </div>
        </div>
    )
}