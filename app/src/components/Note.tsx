import { NoteData } from "../context/NotesContext"

interface NoteProps {
    currentNote : NoteData
}


export default function Note(props: NoteProps) {


    return(
        <>
        <div>
            {props.currentNote.title}
        </div>
        <div>
            {props.currentNote.body}
        </div>
        </>
    )
}