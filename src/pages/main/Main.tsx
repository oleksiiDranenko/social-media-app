//styles
import classes from './Main.module.css';
//custom elements
import { Post } from '../../components/post/Post';
//firebase
import { getDocs, collection, query, orderBy, limit, doc, deleteDoc } from 'firebase/firestore';
import { database, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
//react hooks
import { useEffect } from 'react';
//redux
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
    //getting the user
    const [user] = useAuthState(auth);

    //gettting posts state
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

    //delete post in database
    const deletePost = async (post: PostInterface) => {
        const postRef = doc(database, 'posts', post.postId);
        await deleteDoc(postRef);
    }
    //delete and make a request to change the posts array state
    const handleDelete = async (post: PostInterface) => {
        await deletePost(post);
        getPosts()
    }

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
                        postId={post.postId}
                        currentUser={user?.uid === post.id}
                        deleteFunc={() => handleDelete(post)}
                    />)
                })}
            </div>
        </div>
    )
}