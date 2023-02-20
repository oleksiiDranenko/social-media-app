import { GoogleSignUpButton } from './button/GoogleSighUpButton';
import classes from './SignUp.module.css';

export const SignUp = () => {
    
    return (
        <div className={classes.page}>
            <h2 className={classes.header}>Sign up to your account: </h2>
            <GoogleSignUpButton/>
        </div>
    )
}