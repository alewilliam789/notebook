import Note from "./Note";
import { NoteData, useNotesContext } from "../context/NotesContext";
import { useEffect, useState} from "react";
import NoteForm from "./NoteForm";
import { useNote} from "../hooks/customHooks";


export default function Notepad(){

  const {noteId, isForm, setIsForm} = useNotesContext();
  const [currentNote, setCurrentNote] = useState<NoteData>(JSON.parse(localStorage.getItem('note') || "") || {"_id": "", "title": "", "body" : ""});
  const note = useNote(noteId);


  useEffect(()=>{
    setCurrentNote((prevNote)=>{
      if(noteId){
        return {
          ...prevNote,
          ...note.data
        }
      }
      return prevNote
    })
  },[noteId])

  

  

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
      setCurrentNote((prevNote)=>{
        return {
          ...prevNote,
          title: "",
          body: "",
        }
      });
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
          <Note {...!note.data ? note.data : currentNote} />
        </div>
        <div className="flex gap-6">
          {addButton}
          {editButton}
          {deleteButton}
        </div>
      </div>
  )
}