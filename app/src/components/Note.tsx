
interface NoteProps {
    _id? : string;
    title?: string;
    body?: string;
    userName?: string;
}


export default function Note(props: NoteProps) {


    return(
        <>
        <div className="p-12 flex flex-col gap-5">
            <div className="text-center">
                {props.title}
            </div>
            <div className="">
                {props.body}
            </div>
        </div>
        </>
    )
}