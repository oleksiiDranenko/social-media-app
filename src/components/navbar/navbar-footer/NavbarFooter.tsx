//styles
import classes from './NavbarFooter.module.css';
//react router
import { Link } from 'react-router-dom';
//icons
import homeIcon from '../icon/home.png';
import addPostIcon from '../icon/add-post.png';
import userPageIcon from '../icon/user-page.png';

export const NavbarFooter = () => {
    return (
        <div className={classes.navbar}>
            <Link to={'/'}>
                <img src={homeIcon} width='20px' height='20px'/>
            </Link>
            <Link to={'/create-post'}>
                <img src={addPostIcon} width='20px' height='20px'/>
            </Link>
            <Link to={'/my-posts'}>
                <img src={userPageIcon} width='20px' height='20px'/>
            </Link>
        </div>
    )
}