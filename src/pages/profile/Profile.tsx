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
import { Loading } from '../../components/loading/Loading';

export const Profile = () => {
    //getting the user
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    const userSignOut = async () => {
        await signOut(auth);
        navigate('/signup');
    }

    return (
        <div className={classes.page}>
            {loading ? 
                <div className={classes.profile}>
                    <Loading w='50px' h='50px'/>
                </div>
                : user ? 
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
                : !user ?? null
            }
        </div>
    )
}