//styles
import classes from './GoogleSignUpButton.module.css';
//firebase
import { auth, provider } from '../../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
//react router
import { useNavigate } from 'react-router-dom';
//icon
import googleIcon from '../icon/google.png';

export const GoogleSignUpButton = () => {

    const navigate = useNavigate();

    const signUp = async () => {
        await signInWithPopup(auth,provider);
        navigate('/');
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