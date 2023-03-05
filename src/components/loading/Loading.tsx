import loading from './gif/loading.gif';

interface LoadingInterface {
    w?: string,
    h?: string,
    className?: string
}

export const Loading = (props: LoadingInterface) => {
    return (
        <div>
            <img src={loading} width={props.w} height={props.h} className={props.className}/>
        </div>
    )
}