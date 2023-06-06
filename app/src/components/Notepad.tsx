import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";


export default function Notepad(){

   const {currentNote} = useNotesContext()

const [isEditing, setIsEditing] = useState(false);

if(isEditing) {
  return (
    <div>
      <NoteForm {...currentNote} />
    </div>
  )
}

    return (
        <div>
            <Note {...currentNote} />
        </div>
    )
}