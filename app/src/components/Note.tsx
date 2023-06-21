import { useEffect, useState } from 'react';
import { useCollapse } from "react-collapsed"


import ActionButton from "./ActionButton"
import NoteForm from './NoteForm'


import editLogo from '../images/edit.png'
import deleteLogo from '../images/delete.png'



export interface NoteData  {
    _id : string;
    title: string;
    body: string;
    userName?: string;
}

export interface FormBooleans {
    edit : boolean,
    add : boolean,
    delete: boolean
}

export default function Note(props: NoteData) {



    const [currentNote, setCurrentNote] = useState<NoteData>(props);

    const [isForm, setIsForm] = useState<FormBooleans>({"edit" :false, "add": false, "delete": false});

    const { getCollapseProps, getToggleProps, isExpanded} = useCollapse()


    useEffect(()=>{
        if(!isExpanded){
            setIsForm((prevState)=>{
                return {
                    ...prevState,
                    edit: false,
                    delete : false,
                    add : false
                }
            })
        }
    },[isExpanded])

    return(
        <>
        <div className="w-full bg-yellow-200 rounded-sm">
        <button className="px-8 pt-3 pb-3 w-full rounded-sm text-center text-xl" {...getToggleProps()}>{currentNote.title}</button>
        <div className="flex justify-center content-center" {...getCollapseProps()}>
                <section className="w-full rounded-sm">
                        <div className="p-8 flex justify-end gap-6 ">
                            <ActionButton  action={"edit"} setIsForm={setIsForm} icon={<img className="self-center" src={editLogo} alt="Edit" />} />
                            <ActionButton  action={"delete"} setIsForm={setIsForm} icon={<img className= "self-center" src={deleteLogo} alt="Delete" />} />
                        </div>
                    { isForm.edit || isForm.delete ? 
                         <NoteForm {...{isForm,setIsForm, currentNote, setCurrentNote}}/>
                        :
                        <div className="pattern content">
                            {currentNote.body}
                        </div>
                    }
                    
                </section>
        </div>
        </div>
        </>
    )
}