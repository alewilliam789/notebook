import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import { useEffect, useRef, useState } from "react";
import NoteForm from "./NoteForm";
import { useCookies } from "react-cookie";


export default function Notepad(){

   const {currentNote, setCurrentNote, isEditing, setIsEditing, isAddingNote, setIsAddingNote} = useNotesContext();
   

  useEffect(()=>{
    if(currentNote.title != ""){
      localStorage.setItem('note',JSON.stringify(currentNote))
    }
    const lastNote = JSON.parse(localStorage.getItem('note') || "");
    setCurrentNote((prevState)=>{
      return{
        ...prevState,
        ...lastNote
      }
    })

    
  },[currentNote.title])


  if(isEditing || isAddingNote) {
    return (
      <div>
        <NoteForm />
      </div>
    )
  }
  const addButton = <button onClick={()=>{setIsAddingNote((prevstate)=>{return !prevstate})}}>Add Note</button>;
  const editButton = <button onClick={()=>{setIsEditing((prevstate)=>{return !prevstate})}}>Edit</button> 
   

  return (
      <div className="flex gap-96">
        <div>
          <Note />
        </div>
        <div className="flex gap-6">
          {addButton}
          {editButton}
        </div>

      </div>
  )
}