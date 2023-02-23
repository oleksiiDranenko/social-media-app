import classes from './Main.module.css';
import { Post } from '../../components/post/Post';

import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { database } from '../../config/firebase';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { getPostsArray } from '../../store/postsSlice';

export interface PostInterface {
    postId: string,
    id: string,
    userPhoto: string,
    username: string,
    value: string,
    createdAt: string
}

export const Main = () => {
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
        getPosts();
    }, [])

    return (
        <div className={classes.page}>
            <div className={classes.topDiv}></div>
            <div className={classes.postsDiv}>
                {postsArray?.map((post) => {
                    return (
                    <Post
                        username={post.username} 
                        userPhoto={post.userPhoto} 
                        value={post.value} 
                        date={post.createdAt}  
                        key={post.postId}
                        currentUser={false}
                    />)
                })}
            </div>
        </div>
    )
}