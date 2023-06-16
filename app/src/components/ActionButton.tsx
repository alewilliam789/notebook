import { NoteData ,useNotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

interface ActionButtonProps {
    action : string,
    icon : string | JSX.Element,
    setCachedNote? : React.Dispatch<React.SetStateAction<NoteData>>
} 


export default function ActionButton(props : ActionButtonProps){

    const {setNoteId, setIsForm} = useNotesContext()

    const navigate = useNavigate();

    const changeForm = (formOperation : string) =>{
        if(formOperation == "add"){
          setIsForm((prevState)=>{
            return {
              ...prevState,
              add: true
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


    function handleClick(action : string){
        if(action == "logout"){
            setNoteId("")
            localStorage.clear();
            navigate('/')
        }
        else{
            if(typeof props.setCachedNote != 'undefined'){
                props.setCachedNote((prevNote)=>{
                    return {
                        ...prevNote,
                        title : "",
                        body : ""
                    }
                })
            }
            changeForm(action)
        }
    }



    return (
        <button onClick={() => handleClick(props.action)}>{props.icon}</button>
    )


}