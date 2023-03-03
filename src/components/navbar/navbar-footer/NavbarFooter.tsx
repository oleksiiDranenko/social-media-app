//styles
import classes from './NavbarFooter.module.css';
//react router
import { Link } from 'react-router-dom';
//firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../config/firebase';
//icons
import homeIcon from '../icon/home.png';
import addPostIcon from '../icon/add-post.png';
import userPageIcon from '../icon/user-page.png';

export const NavbarFooter = () => {
    //getting the user
    const [user] = useAuthState(auth);

    return (
        <div className={classes.navbar}>
            <Link to={'/'}>
                <img src={homeIcon} width='20px' height='20px'/>
            </Link>
            <Link to={user ? '/create-post' : '/signup'}>
                <img src={addPostIcon} width='20px' height='20px'/>
            </Link>
            <Link to={user ? '/my-posts' : '/signup'}>
                <img src={userPageIcon} width='20px' height='20px'/>
            </Link>
        </div>
    )
}