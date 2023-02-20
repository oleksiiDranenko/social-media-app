import classes from './GoogleSignUpButton.module.css';
import { auth, provider } from '../../../config/firebase';
import { signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../icon/google.png';

export const GoogleSignUpButton = () => {

    const navigate = useNavigate();

    const signUp = async () => {
        navigate('/');
        await signInWithRedirect(auth,provider);
    }
    

    return (
        <button 
                className={classes.googleSignUp} 
                onClick={ signUp }
            >
                <div className={classes.logoDiv}>
                    <img 
                        src={googleIcon} 
                        alt="googe icon" 
                        className={classes.icon}
                    />
                </div>
                <div className={classes.textDiv}>
                    Sign up with Google
                </div>
            </button>
    )
}