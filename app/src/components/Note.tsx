import { useNoteContext } from "../context/NoteContext"


export default function Note(){

    const {currentNote} = useNoteContext()

    return (
        <>
                <p className="pattern content text-center">{currentNote.title}</p>
                <p className="pattern content">{currentNote.body}</p>
        </>
    )
}