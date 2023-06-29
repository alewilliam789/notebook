import { useNoteContext } from "../context/NoteContext"


export default function Note(){

    const {currentNote} = useNoteContext()

    return (
        <>
            <p className="px-8 pt-3 pb-3 w-full rounded-sm text-center text-xl">{currentNote.title}</p>
            <p className="pattern content">{currentNote.body}</p>
        </>
    )
}