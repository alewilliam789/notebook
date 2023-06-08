import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import { useRef, useState } from "react";
import NoteForm from "./NoteForm";
import { useCookies } from "react-cookie";


export default function Notepad(){

   const {currentNote, isEditing, setIsEditing} = useNotesContext();

const [addNote, setAddNote] = useState(false);
const [cookies, setCookies] = useCookies(['currentNote'])


const renderNote = useRef(currentNote)



if(isEditing) {
  return (
    <div>
      <NoteForm />
    </div>
  )
}

  return (
      <div className="flex gap-96">
        <div>
          <Note {...currentNote} />
        </div>
          <button onClick={()=>{setIsEditing((prevstate)=>{return !prevstate})}}>Edit</button>
      </div>
  )
}