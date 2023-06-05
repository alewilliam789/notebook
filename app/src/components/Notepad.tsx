import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";


export default function Notepad(){

   const {notesData, setNotesData, noteRef} = useNotesContext()

  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] =  useState({
    "title" : "",
    "body" : "",
    "userName" : ""
  });

  useEffect(() =>{
    if(typeof(noteRef.current) == 'number'){
        try{
            setCurrentNote(notesData.Notes[noteRef.current])
        }
        catch{
            Error("This note with this index does not exist in your notes.")
        }
    }}, [noteRef.current])


   if(isEditing){
    return (
        <div>
            <NoteForm {...currentNote} />
        </div>
    )
   }
   else{
    return (
        <div> 
            <Note {...currentNote}/>
        </div>
    )
   }
}