//styles
import classes from './MyPosts.module.css';
//custom element
import { Post } from '../../components/post/Post';
//firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { getDocs, collection, query, orderBy, limit, doc, deleteDoc, where, writeBatch } from 'firebase/firestore';
import { database } from '../../config/firebase';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { getPostsArray } from '../../store/postsSlice';
//interface
import { PostInterface } from '../main/Main';
//hooks
import { useEffect } from 'react';
//icon
import userPicture from '../../icons/user-picture.png'
import { Loading } from '../../components/loading/Loading';

export const MyPosts = () => {
    //getting the user
    const [user, loading] = useAuthState(auth);

    const postsArray = useSelector((state: RootState) => state.postsArray);
    const dispatch = useDispatch();

    const postsCollection = collection(database, 'posts');
    const likesCollection = collection(database, 'likes');
    const commentsCollection = collection(database, 'comments');

    const getPosts = async () => {
        // query for the 10 most recent posts
        const q = query(postsCollection, orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })) as PostInterface[];

        dispatch(getPostsArray(posts));
    }
    
    useEffect(() => {
        if(postsArray.length === 0){
            getPosts();
        }
    }, [])

    //delete post in database
    const deletePost = async (post: PostInterface) => {
        ///deleting post in 'posts' collection
        const postRef = doc(database, 'posts', post.postId);
        await deleteDoc(postRef);

        //deleting all likes of the post
        //query for like doc with the same post and user id
        const likesQuery = query(likesCollection, where('postId', '==', post.postId));
        //getting all like documents with the query
        const likesDocs = await getDocs(likesQuery);
        //create a batch
        const likesBatch = writeBatch(database);
        likesDocs.forEach(doc => likesBatch.delete(doc.ref));
        //commit a batch to delete all like documents at once
        await likesBatch.commit();

        //deleting all comments of the post
        //query for comment doc with the same post and user id
        const commentsQuery = query(commentsCollection, where('postId', '==', post.postId));
        //getting all comment documents with the query
        const commentsDocs = await getDocs(commentsQuery);
        //create a batch
        const commentsBatch = writeBatch(database);
        commentsDocs.forEach(doc => commentsBatch.delete(doc.ref));
        //commit a batch to delete all comment documents at once
        await commentsBatch.commit();
    }
    //delete and make a request to change the posts array state
    const handleDelete = async (post: PostInterface) => {
        await deletePost(post);
        getPosts()
    }


    return (
        <div className={classes.page}>
            <div className={classes.topDiv}></div>

            {loading ? 
                <div className={classes.userInfo}>
                    <Loading w='50px' h='50px' className={classes.loadingPicture}/>
                    <p className={classes.recentPosts}>My recent posts:</p>
                </div>
            : user ? 
                <div className={classes.userInfo}>
                    <img 
                        src={user?.photoURL || userPicture} 
                        className={classes.userPicture}
                    />
                    <p className={classes.recentPosts}>My recent posts:</p>
                </div>
            : !user ?? null
            }

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
                            postId={post.postId}
                            currentUser={true}
                            deleteFunc={() => handleDelete(post)}
                        />)
                }
            })}
            </div>
        </div>
    )
}