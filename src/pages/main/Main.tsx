import classes from './Main.module.css';
import { Post } from '../../components/post/Post';

import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { database, auth} from '../../config/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface PostInterface {
    postId: string,
    id: string,
    userPhoto: string,
    username: string,
    value: string,
    createdAt: string
}

export const Main = () => {

    //getting the user
    const [user] = useAuthState(auth);

    const [postsList, setPostsList] = useState<PostInterface[] | null>(null);

    const postsCollection = collection(database, 'posts');

    const getPosts = async () => {
        // query for the 10 most recent posts
        const q = query(postsCollection, orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })) as PostInterface[];

        setPostsList(posts);
    }
    
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className={classes.page}>
            <div className={classes.topDiv}></div>
            <div className={classes.postsDiv}>
                {postsList?.map((post) => {
                    return <Post username={post.username} userPhoto={post.userPhoto} value={post.value} date={post.createdAt}  key={post.postId}/> 
                })}
            </div>
        </div>
    )
}