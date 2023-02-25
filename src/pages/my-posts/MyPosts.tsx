//styles
import classes from './MyPosts.module.css';
//custom element
import { Post } from '../../components/post/Post';
//firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { getDocs, collection, query, orderBy, limit, doc, deleteDoc } from 'firebase/firestore';
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

    const getPosts = async () => {
        // query for the 10 most recent posts
        const q = query(postsCollection, orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })) as PostInterface[];

        console.log('request my-posts')
        dispatch(getPostsArray(posts));
    }
    
    useEffect(() => {
        if(postsArray.length === 0){
            getPosts();
        }
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