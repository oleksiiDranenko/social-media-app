//styles
import classes from './Profile.module.css';
//firebase
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
//react router
import { useNavigate } from 'react-router-dom';
//icon
import unknownUser from '../../icons/user-picture.png';

export const Profile = () => {
    //getting the user
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const userSignOut = async () => {
        await signOut(auth);
        navigate('/signup');
    }

    return (
        <div className={classes.page}>
            <div className={classes.profile}>
                <img
                    className={classes.profileImg} 
                    src={user?.photoURL || unknownUser} 
                    alt="profile picture" 
                />
                <h1 className={classes.username}>
                    {user?.displayName}
                </h1>
                <p className={classes.userEmail}>
                    {user?.email}
                </p>
                <p className={user?.emailVerified ? classes.isVerified : classes.isNotVerified}>
                    {user?.emailVerified ? 'Email verified' : 'Email not verified'}
                </p>
                <button 
                    onClick={userSignOut}
                    className={classes.signOutButton}
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}