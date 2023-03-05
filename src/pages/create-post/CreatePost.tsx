//styles
import classes from './CreatePost.module.css';
//custom element
import { Form } from './form/Form';
//firebase
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
//icon
import unknownUser from '../../icons/user-picture.png';
import { Loading } from '../../components/loading/Loading';

export const CreatePost = () => {
    //getting the user
    const [user, loading] = useAuthState(auth);

    return (
        <div className={classes.page}>
            <div className={classes.topDiv}></div>
            {loading ? 
                <div className={classes.userData}>
                    <Loading className={classes.userPictureLoading}/>
                    <h1 className={classes.username}>{user?.displayName}</h1>
                </div>
            : user ? 
                <div className={classes.userData}>
                    <img 
                        src={user?.photoURL || unknownUser} 
                        alt="user picture" 
                        className={classes.userPicture}
                    />
                    <h1 className={classes.username}>{user?.displayName}</h1>
                </div>
            : !user ?? null
            }
            <Form/>
        </div>
    )
}