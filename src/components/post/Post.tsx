//styles
import classes from './Post.module.css';
//react hooks
import { useState, useRef, useEffect } from 'react';
//copy
import copy from 'copy-to-clipboard';
//icon
import optionsIcon from '../../icons/options.png'


interface PostInterface {
    username: string,
    userPhoto: string,
    value: string,
    date: string,
    currentUser: boolean,
    deleteFunc?(): any,
    postId: string
}

export const Post = (props: PostInterface) => {
    //options state
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    //copied state
    const [isCopied, setIsCopied] = useState<boolean>(false);

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
            <div className={classes.postDate}>
                {props.date?.substring(0,5)}
            </div>
        </div>
    )
}