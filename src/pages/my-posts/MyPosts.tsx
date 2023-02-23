import classes from './MyPosts.module.css';

import { Post } from '../../components/post/Post';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

import userPicture from '../../icons/user-picture.png'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { getPostsArray } from '../../store/postsSlice';

import { PostInterface } from '../main/Main';

import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { database } from '../../config/firebase';
import { useEffect } from 'react';

export const MyPosts = () => {
    //getting the user
    const [user] = useAuthState(auth);

    const postsArray = useSelector((state: RootState) => state.postsArray);
    const dispatch = useDispatch();

    const postsCollection = collection(database, 'posts');

    const getPosts = async () => {
        // query for the 10 most recent posts
        const q = query(postsCollection, orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })) as PostInterface[];

        dispatch(getPostsArray(posts));
    }

    useEffect(() => {
        if(postsArray.length === 0){
            getPosts()
        }
    }, [])

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
                            currentUser={true}
                        />)
                }
            })}
            </div>
        </div>
    )
}