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
//icon
import deleteIcon from '../icon/delete.png';


export const Form = () => {
    //max charachters
    const MAX_CHAR = 500;
    //max url lenght
    const MAX_URL = 25;
    //input value state
    const [inputValue, setInputValue] = useState<string>('');
    //image url state on change
    const [imageURL, setImageURL] = useState<string>('');
    //is url valid state
    const [isValidURL, setIsValidURL] = useState<boolean>(false);
    //input placeholder
    const [placeholder, setPlaceholder] = useState<'Paste image URL and submit' | 'URL is not valid'>('Paste image URL and submit')
    //getting the user
    const [user] = useAuthState(auth);
    //getting the collection of posts
    const postsCollection = collection(database, 'posts');
    //navigation
    const navigate = useNavigate();


    //updating the image url value
    const URLOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageURL(e.target.value);
    };

    const URLFormOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const img = new Image();
        img.src = imageURL;
        img.onload = () => {
            setIsValidURL(true);
        }
        img.onerror = () => {
            setIsValidURL(false);
            setImageURL('');
            setPlaceholder('URL is not valid')
        }
    }

    const removeImage = () => {
        setIsValidURL(false);
        setImageURL('');
        setPlaceholder('Paste image URL and submit')
    }

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

            if(isValidURL){
                //adding object to the collection
                await addDoc(postsCollection, {
                    id: user?.uid,
                    username: user?.displayName,
                    userPhoto: user?.photoURL,
                    value: value,
                    img: imageURL,
                    createdAt: new Date().toISOString()
                })
                navigate('/')
            } else {
                //adding object to the collection
                await addDoc(postsCollection, {
                    id: user?.uid,
                    username: user?.displayName,
                    userPhoto: user?.photoURL,
                    value: value,
                    img: null,
                    createdAt: new Date().toISOString()
                })
                navigate('/')
            }
        }
    };

    return (
        <form 
            className={classes.form}
            onSubmit={(e) => submitForm(inputValue, e)}
        >
            
            {isValidURL 
                ? 
                    <div className={classes.imageDiv}>
                        <img src={imageURL} className={classes.image}/>
                        <span className={classes.imageURLSpan}>
                            {imageURL.length > MAX_URL ? `${imageURL.substring(0, MAX_URL)}...` : imageURL}
                        </span>
                        <button 
                            onClick={removeImage} 
                            className={classes.deleteImageButton}
                        >
                            <img src={deleteIcon} width='16px' height='16px'/>
                        </button>
                    </div>
                :
                    <div className={classes.addImageDiv}>
                        <input 
                            type="text" 
                            className={classes.imageURLInput}
                            placeholder={placeholder}
                            onChange={URLOnChange}
                            value={imageURL}
                        />
                        <button 
                            className={classes.addImageButton}
                            onClick={URLFormOnSubmit}
                        >
                            Submit
                        </button>
                    </div>
            }

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