import { Link } from "react-router-dom"
import { Note, useNotesContext } from "../context/NotesContext"


export default function Sidebar(): React.JSX.Element{

    const {notesData, handleClick} = useNotesContext();



    if(!notesData.Notes.length){
        return <li> + Create a New Note</li>
    }

    const liList = notesData.Notes.map((note, index) =>{
        return <Link to={`/notes/${note.id}`}><li value={index} onClick={(event)=>{handleClick(event.currentTarget.value)}} key={note.id}>{note.title}</li></Link>
    
    })

    return (
        <div className="">
            <ol>
                {liList}
            </ol>
        </div>
    )
}