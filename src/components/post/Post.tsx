import classes from './Post.module.css';
import optionsIcon from '../../icons/options.png'
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface PostInterface {
    username: string,
    userPhoto: string,
    value: string,
    date: string,
    currentUser: boolean
}

export const Post = (props: PostInterface) => {
    //getting the user
    const [user] = useAuthState(auth);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const manageOptions = () => {
        setIsOpen(!isOpen)
    }

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

                <button onClick={manageOptions} className={classes.optionsButton}>
                    <img 
                        src={optionsIcon}
                        className={classes.optionsIcon}
                    />
                </button>
            </div>

            {isOpen ? 
                <div className={classes.options}>
                    {props.currentUser ? 
                        <>
                        <button className={classes.optionsOption}>Copy</button>
                        <button className={classes.optionsDelete}>Delete</button>
                        </>
                    : <button className={classes.optionsOption}>Copy</button>}
                </div> 
            : null}

            <div className={classes.postValue}>
                {props.value}
            </div>
            <div className={classes.postDate}>
                {props.date?.substring(0,5)}
            </div>
        </div>
    )
}