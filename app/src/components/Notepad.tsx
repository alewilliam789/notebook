import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import { useEffect} from "react";
import NoteForm from "./NoteForm";
import { useCachedNote, useNote} from "../hooks/customHooks";
import ActionButton from "./ActionButton";


export default function Notepad(){

  const {noteId, isForm} = useNotesContext();
  const [cachedNote, setCachedNote] = useCachedNote();
  const note = useNote(noteId);


  useEffect(()=>{
    setCachedNote((prevNote)=>{
      if(noteId){
        return {
          ...prevNote,
          ...note.data
        }
      }
      return prevNote
    })
  },[noteId])

  


  if(isForm.add || isForm.edit || isForm.delete) {
    return (
      <>
        <NoteForm {...{cachedNote, setCachedNote}}/>
      </>
    )
    }
   

  return (
    <>
     <div className="flex justify-center gap-12">
          <ActionButton  action={"add"} icon={"+"} setCachedNote={setCachedNote}/>
          <ActionButton  action={"edit"} icon={"Edit"} />
          <ActionButton  action={"delete"} icon={"Delete"} />
      </div>
      <div className="">
        <div>
          <Note {...!note.data ? note.data : cachedNote} />
        </div>
      </div>
    </>
  )
}