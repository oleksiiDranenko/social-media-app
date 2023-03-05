//styles
import classes from './SignUp.module.css';
//custom element
import { GoogleSignUpButton } from './button/GoogleSighUpButton';

export const SignUp = () => {
    
    return (
        <div className={classes.page}>
            <h2 className={classes.header}>Sign up to your account: </h2>
            <GoogleSignUpButton/>
        </div>
    )
}