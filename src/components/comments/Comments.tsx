//styles
import classes from './Comments.module.css';
//custom element
import { CommentItem } from './comment-item/CommmentItem';
//firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../config/firebase';
//react hooks
import { useEffect, useState } from 'react';
//icons
import userPhoto from '../../icons/user-picture.png';
import { addDoc, collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

interface PropsInterface {
    postId: string
}

interface Comment {
    userId: string,
    userPhoto: string,
    username: string,
    postId: string,
    value: string,
    createdAt: string
}

export const Comments = (props: PropsInterface) => {
    //getting the user
    const [user] = useAuthState(auth);
    //max comment lenght
    const MAX_CHAR = 50;
    //input value state
    const [inputValue, setInputValue] = useState<string>('');
    //comments array state
    const [commentsArray, setCommentsArray] = useState<Comment[]>([]);

    const commentsCollection = collection(database, 'comments');

    useEffect(() => {
        getComments()
    }, [])

    //updating the input value
    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    //add comment
    const addComment = async (value: string, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (value.trim() !== '' && value.length <= MAX_CHAR){
            try {
                const newDoc = {
                    userId: user?.uid,
                    userPhoto: user?.photoURL,
                    username: user?.displayName,
                    postId: props.postId,
                    value: inputValue,
                    createdAt: new Date().toISOString()
                }

                await addDoc(commentsCollection, newDoc)

                //change the comments array state
                setCommentsArray((comments) => comments ? [...comments, newDoc as Comment] : [newDoc as Comment])
                //clear the input after submit
                setInputValue('')
            } catch (err){
                console.log('Error: ', err)
            }

        }
    }

    //query for comments
    const commentsDocs = query(commentsCollection, where('postId', '==', props.postId));

    //getting the comments array
    const getComments = async () => {
        const data = await getDocs(commentsDocs);
        //changing the state
        setCommentsArray(data.docs.map((doc) => ({...doc.data()}) as Comment))
    }
    
    return (
        <div className={classes.commentSection}>
            <form onSubmit={(e) => addComment(inputValue, e)} className={classes.inputSection}>
                <img src={user?.photoURL || userPhoto} className={classes.userPhoto}/>
                <input 
                    type="text" 
                    className={classes.input} 
                    placeholder='Add comment...'
                    onChange={inputOnChange}
                    value={inputValue}
                />
            </form>

            <div className={classes.comments}>
                {commentsArray.map((comment) => {
                    return (
                        <CommentItem
                            userPhoto={comment.userPhoto}
                            username={comment.username}
                            value={comment.value}
                            key={comment.createdAt}
                        />
                    )
                })}
            </div>
        </div>
    )
}