import { useFormContext } from "../context/FormContext"
import { useNoteContext } from "../context/NoteContext"


export default function Note(){

    const {currentNote} = useNoteContext()
    const {state} = useFormContext()

    return (
        <>
            <p className="px-8 pt-3 pb-3 w-full rounded-sm text-center text-xl">{state.edit ? currentNote.title : null}</p>
            <p className={`pattern content ${state.add || state.edit ? "" : "shadow-bottom"}`}>{currentNote.body}</p>
        </>
    )
}