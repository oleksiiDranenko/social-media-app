//styles
import classes from './Comments.module.css';
//custom element
import { CommentItem, CommentProps } from './comment-item/CommmentItem';
import { CommmentsLoading } from './comments-loading/CommentsLoading';
import { NoComments } from './no-comments/NoComments';
//firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../config/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
//react hooks
import { useEffect, useState, useRef } from 'react';
//icons
import userPhoto from '../../icons/user-picture.png';

interface PropsInterface {
    postId: string,
    increaseCommentsState(): void,
    decreaseCommentsState(): void
}

export interface CommentInterface {
    commentId: string,
    userId: string,
    userPhoto: string,
    username: string,
    postId: string,
    value: string,
    createdAt: string,
    currentUser: boolean,
    removeComment(): void
}

export const Comments = (props: PropsInterface) => {
    //max comment lenght
    const MAX_CHAR = 50;
    //getting the user
    const [user] = useAuthState(auth);
    //input value state
    const [inputValue, setInputValue] = useState<string>('');
    //comments array state
    const [commentsArray, setCommentsArray] = useState<CommentInterface[]>([]);
    //loading state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    //placeholder state
    const [placeholder, setPlaceholder] = useState<
        'Add comment...' | 
        'The max length is 50 char' | 
        'Comment must have a value'
    >('Add comment...')
    //input ref
    const inputRef = useRef<HTMLInputElement>(null);
    //collection of comment docs
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

                await addDoc(commentsCollection, newDoc);

                //change the comments array state
                getComments();
                //increase the count of comments by 1
                props.increaseCommentsState();
                //clear the input after submit
                setInputValue('');
                //change the input placeholder
                setPlaceholder('Add comment...');
                //blur the input
                inputRef.current?.blur();
            } catch (err){
                console.log('Error: ', err)
            }
        } else if (value.trim() === '') {
            //clear the input after submit
            setInputValue('');
            //setting error as a placeholder and bluring input
            setPlaceholder('Comment must have a value');
            inputRef.current?.blur();
        } else if (value.length > MAX_CHAR) {
            //clear the input after submit
            setInputValue('');
            //setting error as a placeholder and bluring input
            setPlaceholder('The max length is 50 char');
            inputRef.current?.blur();
        }
    }


    //delete comment
    const removeComment = async (comment: CommentProps) => {
        try {
            //make a ref to the comment
            const commentRef = doc(database, 'comments', comment.commentId)
            await deleteDoc(commentRef);

            //update comments
            getComments();
            //decrease the count of comments by 1
            props.decreaseCommentsState()
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    //query for comments
    const commentsDocs = query(commentsCollection, where('postId', '==', props.postId));

    //getting the comments array
    const getComments = async () => {
        const data = await getDocs(commentsDocs);
        //changing the state
        setCommentsArray(data.docs.map((doc) => ({...doc.data(), commentId: doc.id}) as CommentInterface));
        setIsLoading(false);
    }
    
    return (
        <div className={classes.commentSection}>
            <form onSubmit={(e) => addComment(inputValue, e)} className={classes.inputSection}>
                <img src={user?.photoURL || userPhoto} className={classes.userPhoto}/>
                <input 
                    type="text" 
                    className={classes.input} 
                    placeholder={placeholder}
                    onChange={inputOnChange}
                    value={inputValue}
                    ref={inputRef}
                />
            </form>

            <div className={classes.comments}>
                {isLoading ? <CommmentsLoading/> 
                : commentsArray.length !== 0 ? commentsArray.map((comment: CommentProps) => {
                    return (
                        <CommentItem
                            commentId={comment.commentId}
                            userPhoto={comment.userPhoto}
                            username={comment.username}
                            userId={comment.userId}
                            value={comment.value}
                            key={comment.createdAt}
                            currentUser={user?.uid === comment.userId}
                            createdAt={comment.createdAt}
                            removeComment={() => removeComment(comment)}
                        />
                    )
                }) : <NoComments/>}
            </div>
        </div>
    )
}