import classes from './Form.module.css';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { database, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


export const Form = () => {
    const MAX_CHAR = 500;

    const [inputValue, setInputValue] = useState<string>('');

    const inputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const [user] = useAuthState(auth);
    const postsCollection = collection(database, 'posts');

    const navigate = useNavigate();

    const submitForm = async (value: string, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (value.trim() !== '' && value.length <= MAX_CHAR) {
            await addDoc(postsCollection, {
                id: user?.uid,
                username: user?.displayName,
                value: value
            })
            navigate('/my-posts')
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
                placeholder='Whats new?'
            ></textarea>
            
            <span 
                className={inputValue.length <= MAX_CHAR ? classes.counter : classes.counterError}
            >
                {`${inputValue.length} / ${MAX_CHAR}`}
            </span>

            <input 
                type="submit" 
                value={'Publish'}
                className={classes.submitButton}
            />
        </form>
    )
}