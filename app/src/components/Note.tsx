
interface NoteProps {
    _id? : string;
    title?: string;
    body?: string;
    userName?: string;
}


export default function Note(props: NoteProps) {


    return(
        <>
        <div>
            {props.title}
        </div>
        <div>
            {props.body}
        </div>
        </>
    )
}