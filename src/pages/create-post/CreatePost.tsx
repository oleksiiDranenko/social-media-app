import { Form } from './form/Form';
import classes from './CreatePost.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import unknownUser from '../../icons/user-picture.png';

export const CreatePost = () => {

    const [user] = useAuthState(auth);

    return (
        <div className={classes.page}>
            <div className={classes.userData}>
                <img 
                    src={user?.photoURL || unknownUser} 
                    alt="user picture" 
                    className={classes.userPicture}
                />
                <h1 className={classes.username}>{user?.displayName}</h1>
            </div>
            <Form/>
        </div>
    )
}