import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import unknownUser from '../../icons/user-picture.png';
import classes from './Profile.module.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

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