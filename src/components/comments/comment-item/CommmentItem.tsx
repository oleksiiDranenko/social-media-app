import classes from './CommentItem.module.css';
import userPhoto from '../../../icons/user-picture.png';
import optionsIcon from '../../../icons/options.png';

interface CommentProps {
    userPhoto: string,
    username: string,
    value: string
}

export const CommentItem = (props: CommentProps) => {
    
    return (
        <div className={classes.comment}>
            <div className={classes.userPhotoDiv}>
                <img 
                    src={props.userPhoto}
                    className={classes.userPhoto}
                />
            </div>
            <div className={classes.commentBody}>
                <div className={classes.commentBodyTop}>
                    <span className={classes.username}>{props.username}</span>
                    <button className={classes.optionsButton}>
                        <img 
                            src={optionsIcon}
                            className={classes.optionsIcon}
                        />
                    </button>
                </div>
                <div className={classes.commentValue}>
                    {props.value}
                </div>
            </div>

        </div>
    )
}