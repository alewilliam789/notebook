import { useEffect, useState } from 'react';
import { useCollapse } from "react-collapsed"


import ActionButton from "./ActionButton"
import NoteForm from './NoteForm'

import { useFormContext } from '../context/FormContext';


import editLogo from '../images/edit.png';
import deleteLogo from '../images/delete.png';

import { useNoteContext } from '../context/NoteContext';
import Note from './Note';









export default function NotePanel() {


    const {state, dispatch} = useFormContext()

    const {currentNote} = useNoteContext()

    const [isExpanded, setExpanded] = useState<boolean>(false);
    


    const { getCollapseProps, getToggleProps} = useCollapse({defaultExpanded : state.add ? true : false})



    useEffect(()=>{
        if(isExpanded == false){
            dispatch({type:"collapsed"})
        }
    },[isExpanded])

    function handleclick(){
        setExpanded((prevExpanded)=> !prevExpanded)
    }

    function NoteSwitcher(){
        if(state.add || state.edit || state.delete){
            return (
            <>
                <NoteForm />
            </>)
        }
        return (
            <>
               <Note />
            </>
        )
    }

    return(
        <>
        <div className='w-full bg-yellow-200 rounded-sm'>
        <button className="px-8 pt-3 pb-3 w-full rounded-sm text-center text-xl" {...getToggleProps({onClick: handleclick})}>
            {state.edit && isExpanded ? null : currentNote.title}
        </button>
        <div className="flex justify-center content-center" {...getCollapseProps()}>
                <section className="w-full rounded-sm">
                        <div className="p-8 flex justify-end gap-6 ">
                            <ActionButton handleClick={state.add ? null : ()=>{dispatch({type:"edit"})}} icon={<img className="self-center" src={editLogo} alt="Edit" />} />
                            <ActionButton handleClick={state.add ? null : ()=>{dispatch({type:"delete"})}} icon={<img className= "self-center" src={deleteLogo} alt="Delete" />} />
                        </div>
                    <NoteSwitcher />
                </section>
        </div>
        </div>
        </>
    )
}