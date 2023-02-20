import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import unknownUser from './icon/user-picture.png';
import logo from './icon/logo.png';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {

    const [user] = useAuthState(auth);

    const location = useLocation();

    return (
        <div className={classes.div}>
            
            <div className={classes.logoDiv}>
                <img 
                    src={logo} 
                    alt="app logo" 
                    className={classes.logo}
                />
                <span>Posting app</span>
            </div>

            <div className={classes.navDiv}>
                <Link 
                    className={location.pathname === '/' ? classes.navLinkFocused : classes.navLink} 
                    to={'/'}
                >
                    All posts
                </Link>
                <Link 
                    className={location.pathname === '/my-posts' ? classes.navLinkFocused : classes.navLink} 
                    to={user ? '/my-posts' : '/signup'}
                >
                    My posts
                </Link>
                <Link 
                    className={location.pathname === '/create-post' ? classes.navLinkFocused : classes.navLink} 
                    to={user ? '/create-post' : '/signup'}
                >
                    New post
                </Link>
            </div>
            
            <div className={classes.userDiv}>
                {
                    !user ? 
                        <Link className={classes.signUpLink} to={'/signup'}>Sign up</Link>
                    :
                        <>
                            <span>{user?.displayName}</span>
                            <Link to='/profile'>
                                <img
                                    className={classes.profileImg} 
                                    src={user?.photoURL || unknownUser} 
                                    alt="profile picture" 
                                />
                            </Link>
                        </>
                }
            </div>
        </div>   
    )
}