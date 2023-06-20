import { useState , useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";


import { FormBooleans, NoteData } from './Note';

interface ActionButtonProps {
    action : string,
    icon : string | JSX.Element,
    setIsForm? : React.Dispatch<React.SetStateAction<FormBooleans>>,
    setCachedNote? : React.Dispatch<React.SetStateAction<NoteData>>
} 


export default function ActionButton({action, icon, setIsForm, setCachedNote} : ActionButtonProps){


    const navigate = useNavigate();

    const [styleClass, setStyleClass] = useState<string>("");

    useLayoutEffect(()=>{
        if(action == 'logout'){
            setStyleClass("")
        }
        else{
            setStyleClass("w-16 h-16 bg-white flex justify-center border rounded-full")
        }
    },[])

    const changeForm = (formOperation : string) =>{
      if(setIsForm){
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
      }
    };


    function handleClick(){
        if(action == "logout"){
            navigate('/')
        }
        else{
            if(typeof setCachedNote != 'undefined'){
                setCachedNote((prevNote)=>{
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
        <button className={styleClass} onClick={() => handleClick()}>{icon}</button>
    )


}