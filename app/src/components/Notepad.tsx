import { useEffect} from "react";

import Note from "./Note";
import { useNotesContext } from "../context/NotesContext";
import NoteForm from "./NoteForm";
import { useCachedNote, useNote} from "../hooks/customHooks";
import ActionButton from "./ActionButton";

import editLogo from '../images/edit.png';
import deleteLogo from '../images/delete.png';
import addLogo from '../images/add.png';
import Collapsible from "./Collapsible";


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
    <div className="flex flex-col gap-32">
     <div className="self-center flex justify-center gap-12">
          <ActionButton  action={"add"} icon={<img className="self-center" src={addLogo} alt="+"/>} setCachedNote={setCachedNote}/>

      </div>
      <div className="w-full self-center shadow-inner">
        <div>
            <Note {...!note.data ? note.data : cachedNote} />
        </div>
      </div>
    </div>
    
    </>
  )
}