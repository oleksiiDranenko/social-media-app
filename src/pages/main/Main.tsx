import classes from './Main.module.css';
import { Post } from '../../components/post/Post';

import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { database } from '../../config/firebase';
import { useEffect, useState } from 'react';

export interface PostInterface {
    postId: string,
    id: string,
    userPhoto: string,
    username: string,
    value: string
}

export const Main = () => {
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
                    return <Post username={post.username} userPhoto={post.userPhoto} value={post.value} key={post.postId}/> 
                })}
            </div>
        </div>
    )
}