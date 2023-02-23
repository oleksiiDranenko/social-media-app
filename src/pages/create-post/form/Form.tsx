//styles
import classes from './Form.module.css';
//react hooks
import { useState } from 'react';
//firebase
import { addDoc, collection } from 'firebase/firestore';
import { database, auth } from '../../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
//react router
import { useNavigate } from 'react-router-dom';


export const Form = () => {
    //max charachters
    const MAX_CHAR = 500;
    //input valiue state
    const [inputValue, setInputValue] = useState<string>('');
    //getting the user
    const [user] = useAuthState(auth);
    //getting the collection of posts
    const postsCollection = collection(database, 'posts');
    //navigation
    const navigate = useNavigate();

    //prevent linebreaks
    const excludeEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
        }
    }

    //updating the input value
    const inputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const submitForm = async (value: string, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (value.trim() !== '' && value.length <= MAX_CHAR) {

            //adding object to the collection
            await addDoc(postsCollection, {
                id: user?.uid,
                username: user?.displayName,
                userPhoto: user?.photoURL,
                value: value,
                createdAt: new Date().toLocaleTimeString()
            })
            navigate('/')
        }
    };

    return (
        <form 
            className={classes.form}
            onSubmit={(e) => submitForm(inputValue, e)}
        >
            <textarea 
                className={classes.textarea}
                onChange={inputOnChange}
                onKeyDown={excludeEnter}
                placeholder='Whats new?'
            ></textarea>
            
            <span 
                className={inputValue.length <= MAX_CHAR ? classes.counter : classes.counterError}
            >
                {`${(inputValue.length)} / ${MAX_CHAR}`}
            </span>

            <input 
                type="submit" 
                value={'Publish'}
                className={classes.submitButton}
            />
        </form>
    )
}