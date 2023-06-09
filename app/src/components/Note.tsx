import { useNotesContext } from "../context/NotesContext"




export default function Note() {

const {currentNote} = useNotesContext()
return(
    <>
    <div>
        {currentNote.title}
    </div>
    <div>
        {currentNote.body}
    </div>
    </>
)
}