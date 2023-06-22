import { useEffect, useState } from 'react';
import { useCollapse } from "react-collapsed"


import ActionButton from "./ActionButton"
import NoteForm from './NoteForm'

import { useMutationContext } from '../context/MutationContext';


import editLogo from '../images/edit.png'
import deleteLogo from '../images/delete.png'



export interface NoteData  {
    _id? : string;
    title: string;
    body: string;
    userName?: string;
}

interface NoteProps {
    note: NoteData

}


export default function Note({note}: NoteProps) {



    const [currentNote, setCurrentNote] = useState<NoteData>(note);

    const {state, dispatch} = useMutationContext()

    const [isExpanded, setExpanded] =useState(false);

    const { getCollapseProps, getToggleProps} = useCollapse({defaultExpanded : state.add ? true : false})



    useEffect(()=>{
        if(isExpanded == false){
            dispatch({type:"collapsed"})
        }
    },[isExpanded])

    function handleclick(){
        setExpanded((prevExpanded)=> !prevExpanded)
    }

    function IsAdding(){
        if(state.add){
            return null
        }
        return (
            <>
            <ActionButton handleClick={()=>{dispatch({type:"edit"})}} icon={<img className="self-center" src={editLogo} alt="Edit" />} />
            <ActionButton handleClick={()=>{dispatch({type:"delete"})}} icon={<img className= "self-center" src={deleteLogo} alt="Delete" />} />
        </>  
        )
    }

    function IsForm(){
        if(state.add || state.edit || state.delete){
            return (
            <>
                <NoteForm {...{currentNote, setCurrentNote}}/>
            </>)
        }
        return (
            <div className="pattern content">
                {currentNote.body}
            </div>
        )
    }

    return(
        <>
        <div className="w-full bg-yellow-200 rounded-sm">
        <button className="px-8 pt-3 pb-3 w-full rounded-sm text-center text-xl" {...getToggleProps({onClick: handleclick})}>
            {state.edit && isExpanded ? null : currentNote.title}
        </button>
        <div className="flex justify-center content-center" {...getCollapseProps()}>
                <section className="w-full rounded-sm">
                        <div className="p-8 flex justify-end gap-6 ">
                            <IsAdding />
                        </div>
                    <IsForm />
                </section>
        </div>
        </div>
        </>
    )
}