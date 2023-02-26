//styles
import classes from './Post.module.css';
//react hooks
import { useState, useRef, useEffect } from 'react';
//firebase
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
//copy
import copy from 'copy-to-clipboard';
//months array
import { monthsArray } from '../../months/months-array';
//icons
import optionsIcon from '../../icons/options.png';
import likeIcon from './icons/like.png';
import likeActiveIcon from './icons/like-active.png';


interface PostInterface {
    username: string,
    userPhoto: string,
    value: string,
    date: string,
    currentUser: boolean,
    deleteFunc(): void,
    postId: string
}

interface LikeInterface {
    userId: string
}

export const Post = (props: PostInterface) => {
    //getting the user
    const [user] = useAuthState(auth);

    //options state
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    //copied state
    const [isCopied, setIsCopied] = useState<boolean>(false);
    //likes count
    const [likesArray, setLikesArray] = useState<LikeInterface[]>([]);
    
    //likes collection
    const likesCollection = collection(database, 'likes');
    //query for documents with this posts id
    const likeDocs = query(likesCollection, where('postId', '==', props.postId));

    //is user already liked 
    const isLiked = likesArray.find((like) => like.userId === user?.uid);

    //getting the likes array
    const getLikes = async () => {
        const data = await getDocs(likeDocs);
        setLikesArray(data.docs.map((doc) => ({userId: doc.data().userId})))
    }

    //adding like document 
    const addLike = async () => {
        //change the state only if document is added to database
        try {
            await addDoc(likesCollection, {
                userId: user?.uid,
                postId: props.postId
            })
            if(user){
                //changing the state
                setLikesArray((likes) => likes ? [...likes, {userId: user?.uid}] : [{userId: user?.uid}])
            }
        } catch(err) {
            console.error('Error: ', err)
        }
    }

    //deleting like document 
    const removeLike = async() => {
        try {
            //query for doc with the same post and user id
            const deleteQuery = query(
                likesCollection, 
                where('postId', '==', props.postId), 
                where('userId', '==', user?.uid)
            );

            //getting all documents with the query
            const deleteData = await getDocs(deleteQuery);
            //getting the first and only documents id
            const deleteLike = doc(database, 'likes', deleteData.docs[0].id);
            await deleteDoc(deleteLike);

            //changing the state
            setLikesArray(likesArray.filter((like) => like.userId !== user?.uid));
        } catch(err) {
            console.log('Error: ', err)
        }
    }

    //update likes count state
    useEffect(() => {
        getLikes()
    }, [])


    //track clicks outside options to close
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if(optionsRef.current && !optionsRef.current.contains(e.target as Node)){
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    //open/close options
    const handleOptions = () => {
        setIsOpen(!isOpen);
    }

    //copy posts value
    const handleCopy = () => {
        copy(props.value);
        setIsCopied(true);
    }

    return (
        <div className={classes.post}>
            <div className={classes.userInfo}>
                <div className={classes.user}>
                    <img 
                        src={props.userPhoto}
                        alt='user profile photo'
                        className={classes.userPhoto}
                    />
                    <span className={classes.username}>{props.username}</span>
                </div>

                <div ref={optionsRef}>
                    <button onClick={handleOptions} className={classes.optionsButton}>
                        <img 
                            src={optionsIcon}
                            className={classes.optionsIcon}
                        />
                    </button>
                    {isOpen ? 
                        <div className={classes.options}>
                            {props.currentUser ? 
                                <>
                                <button onClick={handleCopy} className={classes.optionsOption}>{isCopied ? 'Copied!' : 'Copy'}</button>
                                <button onClick={props.deleteFunc} className={classes.optionsDelete}>Delete</button>
                                </>
                            : <button onClick={handleCopy} className={classes.optionsOption}>
                                {isCopied ? 'Copied!' : 'Copy'}
                              </button>}
                        </div> 
                    : null}
                </div>

            </div>

            <div className={classes.postValue}>
                {props.value}
            </div>
            <div className={classes.footer}>
                <div className={classes.postDate}>
                    {`${props.date?.substring(11,16)} 
                    ${monthsArray[parseInt(props.date?.substring(5,8))]} 
                    ${props.date?.substring(8,10)}`} 
                </div>

                <div className={classes.likesSection}>
                    <button onClick={isLiked ? removeLike : addLike} className={classes.likeButton}>
                        <img src={isLiked ? likeActiveIcon : likeIcon} className={classes.likeIcon}/>
                    </button>
                    <span className={classes.likesCount}>{likesArray.length}</span>
                </div>
            </div>
        </div>
    )
}