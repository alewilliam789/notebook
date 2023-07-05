import { useNoteContext } from "../context/NoteContext"


export default function Note(){

    const {currentNote} = useNoteContext()

    return (
        <>
                <p className="content text-center text-xl font-bold">{currentNote.title}</p>
                <p className="content">{currentNote.body}</p>
        </>
    )
}