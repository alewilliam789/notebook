import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import { useEffect} from "react";
import NoteForm from "./NoteForm";


export default function Notepad(){

   const {currentNote, setCurrentNote, isForm, setIsForm} = useNotesContext();
   

  useEffect(()=>{
    if(currentNote.title != ""){
      localStorage.setItem('note',JSON.stringify(currentNote))
    }
    else if(localStorage.getItem('note')){
      const lastNote = JSON.parse(localStorage.getItem('note') || "");
      setCurrentNote((prevState)=>{
        return{
          ...prevState,
          ...lastNote
        }
      })
    }
  },[currentNote.body])


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
        <NoteForm />
      </div>
    )
  }
  const addButton = <button onClick={()=>{changeForm("add")}}>+</button>;
  const editButton = <button onClick={()=>{changeForm("edit")}}>Edit</button> 
  const deleteButton = <button onClick={()=>{changeForm("delete")}}>Delete</button>
   

  return (
      <div className="flex gap-96">
        <div>
          <Note />
        </div>
        <div className="flex gap-6">
          {addButton}
          {editButton}
          {deleteButton}
        </div>

      </div>
  )
}