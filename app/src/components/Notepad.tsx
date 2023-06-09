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
    const lastNote = JSON.parse(localStorage.getItem('note') || "");
    setCurrentNote((prevState)=>{
      return{
        ...prevState,
        ...lastNote
      }
    })

    
  },[currentNote.title])


  const changeForm = (formOperation : string) =>{
    if(formOperation == "add")
      setIsForm((prevState)=>{
        return {
          ...prevState,
          add: true
        }
      })
    else {
      setIsForm((prevState)=>{
        return {
          ...prevState,
          edit: true
        }
      })
    }
  };


  if(isForm.add || isForm.edit) {
    return (
      <div>
        <NoteForm />
      </div>
    )
  }
  const addButton = <button onClick={()=>{changeForm("add")}}>Add Note</button>;
  const editButton = <button onClick={()=>{changeForm("edit")}}>Edit</button> 
   

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