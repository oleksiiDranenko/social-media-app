import classes from './MyPosts.module.css';

import { Post } from '../../components/post/Post';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

import userPicture from '../../icons/user-picture.png'

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const MyPosts = () => {
    //getting the user
    const [user] = useAuthState(auth);

    const postsArray = useSelector((state: RootState) => state.postsArray);

    return (
        <div className={classes.page}>
            <div className={classes.topDiv}></div>

            <div className={classes.userInfo}>
                <img 
                    src={user?.photoURL || userPicture} 
                    className={classes.userPicture}
                />
                <p className={classes.recentPosts}>My recent posts:</p>
            </div>

            <div className={classes.postsDiv}>
            {postsArray?.map((post) => {
                if(user?.uid === post.id) {
                    return (
                        <Post
                            username={post.username} 
                            userPhoto={post.userPhoto} 
                            value={post.value} 
                            date={post.createdAt}  
                            key={post.postId}
                        />)
                }
            })}
            </div>
        </div>
    )
}