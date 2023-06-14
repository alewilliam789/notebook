import Note from "./Note";
import { NoteData, useNotesContext } from "../context/NotesContext";
import { useEffect, useState} from "react";
import NoteForm from "./NoteForm";


export default function Notepad(){

   const {notesData, noteIndex, isForm, setIsForm} = useNotesContext();
   const [currentNote, setCurrentNote] = useState<NoteData>(JSON.parse(localStorage.getItem('note') || ""))



   useEffect(()=>{

    const cachedNote : NoteData = JSON.parse(localStorage.getItem('note') || "");

       setCurrentNote((prevState)=>{
           if(cachedNote){
               return {
                   ...prevState,
                   ...cachedNote
               }
            }
           return prevState
       })
   },[notesData, noteIndex])


  const changeForm = (formOperation : string) =>{
    if(formOperation == "add"){
      setIsForm((prevState)=>{
        return {
          ...prevState,
          add: true
        }
      });
      setCurrentNote((prevNote)=>{
        return {
          ...prevNote,
          title: "",
          body: "",
        }
      });
      }
    else if(formOperation == "edit"){
      setIsForm((prevState)=>{
        return {
          ...prevState,
          edit: true
        }
      })
    }
    else{
      setIsForm((prevState)=>{
        return {
          ...prevState,
          delete: true
        }
      })
    }
  };


  if(isForm.add || isForm.edit || isForm.delete) {
    return (
      <div>
        <NoteForm {...{currentNote, setCurrentNote}}/>
      </div>
    )
  }
  const addButton = <button onClick={()=>{changeForm("add")}}>+</button>;
  const editButton = <button onClick={()=>{changeForm("edit")}}>Edit</button> 
  const deleteButton = <button onClick={()=>{changeForm("delete")}}>Delete</button>
   

  return (
      <div className="flex gap-96">
        <div>
          <Note {...{currentNote}} />
        </div>
        <div className="flex gap-6">
          {addButton}
          {editButton}
          {deleteButton}
        </div>

      </div>
  )
}