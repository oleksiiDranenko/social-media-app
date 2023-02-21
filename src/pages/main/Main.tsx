import classes from './Main.module.css';
import { Post } from '../../components/post/Post';
import photo from '../../icons/user-picture.png';

import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { database } from '../../config/firebase';
import { useEffect, useState } from 'react';

interface Post {
    postId: string,
    id: string,
    userPhoto: string,
    username: string,
    value: string
}

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null)

    const postsCollection = collection(database, 'posts');

    const getPosts = async () => {
        // Query for the 10 most recent posts
        const q = query(postsCollection, orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })) as Post[];

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