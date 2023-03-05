//styles
import classes from './CommentItem.module.css';
//react hooks
import { useEffect, useRef, useState } from 'react';
//copy
import copy from 'copy-to-clipboard';
//icons
import optionsIcon from '../../../icons/options.png';
import { monthsArray } from '../../../months/months-array';

export interface CommentProps {
    commentId: string,
    userId: string,
    userPhoto: string,
    username: string,
    value: string,
    createdAt: string,
    currentUser: boolean,
    removeComment(): void
}

export const CommentItem = (props: CommentProps) => {

    //options state
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    //copied state
    const [isCopied, setIsCopied] = useState<boolean>(false);

    //open/close options
    const handleOptions = () => {
        setOptionsOpen(!optionsOpen)
    }

    //copy comment value
    const handleCopy = () => {
        copy(props.value);
        setIsCopied(true);
    }

    //track clicks outside options to close
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if(optionsRef.current && !optionsRef.current.contains(e.target as Node)){
                setOptionsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])


    return (
        <div className={classes.comment}>
            <div className={classes.userPhotoDiv}>
                <img 
                    src={props.userPhoto}
                    className={classes.userPhoto}
                />
            </div>
            <div className={classes.commentBody}>
                <div className={classes.commentBodyTop}>
                    <span className={classes.username}>
                        {props.username}
                    </span>


                    <div ref={optionsRef}>
                        <button 
                            className={classes.optionsButton} 
                            onClick={handleOptions}
                        >
                            <img 
                                src={optionsIcon}
                                className={classes.optionsIcon}
                            />
                        </button>
                        {optionsOpen ? 
                        <div className={classes.options}>
                        {props.currentUser ? 
                            <>
                            <button onClick={handleCopy} className={classes.optionsOption}>{isCopied ? 'Copied!' : 'Copy'}</button>
                            <button onClick={props.removeComment} className={classes.optionsDelete}>Delete</button>
                            </>
                        : <button onClick={handleCopy} className={classes.optionsOption}>
                            {isCopied ? 'Copied!' : 'Copy'}
                          </button>}
                        </div> 
                        : null}
                    </div>
                </div>
                <div className={classes.commentValue}>
                    {props.value}
                </div>

                <div className={classes.commentDate}>
                    {`${props.createdAt?.substring(11,16)} 
                    ${monthsArray[parseInt(props.createdAt?.substring(5,8))]} 
                    ${props.createdAt?.substring(8,10)}`} 
                </div>
            </div>

        </div>
    )
}