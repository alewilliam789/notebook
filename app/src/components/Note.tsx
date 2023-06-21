import { useEffect, useState } from 'react';
import { useCollapse } from "react-collapsed"


import ActionButton from "./ActionButton"
import NoteForm from './NoteForm'


import editLogo from '../images/edit.png'
import deleteLogo from '../images/delete.png'



export interface NoteData  {
    _id? : string;
    title: string;
    body: string;
    userName?: string;
}

export interface FormBooleans {
    edit : boolean,
    delete: boolean,
    add : boolean
}

interface NoteProps {
    note: NoteData,
    isAdd?: boolean,
    setIsAdd? : React.Dispatch<React.SetStateAction<boolean>>

}


export default function Note({note, isAdd, setIsAdd}: NoteProps) {



    const [currentNote, setCurrentNote] = useState<NoteData>(note);

    const [isForm, setIsForm] = useState<FormBooleans>({"edit" :false, "delete": false,"add":isAdd ? isAdd : false});

    const [isExpanded, setExpanded] =useState(false);

    const { getCollapseProps, getToggleProps} = useCollapse({defaultExpanded : isAdd ? true : false})



    useEffect(()=>{
        if(isExpanded == false){
            setIsForm((prevState)=>{
                return {
                    ...prevState,
                    edit: false,
                    delete : false
                }
            })
        }
        if((isAdd != isForm.add) && setIsAdd){
            setIsAdd((prevState)=>{
                return !prevState
            })
        }
    },[isExpanded, isForm.add])

    return(
        <>
        <div className="w-full bg-yellow-200 rounded-sm">
        <button className="px-8 pt-3 pb-3 w-full rounded-sm text-center text-xl" {...getToggleProps(
            {
                onClick: () => setExpanded((prevExpanded)=> !prevExpanded),
            }
        )}>{isForm.edit && isExpanded ? null : currentNote.title}</button>
        <div className="flex justify-center content-center" {...getCollapseProps()}>
                <section className="w-full rounded-sm">
                        <div className="p-8 flex justify-end gap-6 ">
                            { isAdd ? null : 
                            <>
                                <ActionButton  action={"edit"} setIsForm={setIsForm} icon={<img className="self-center" src={editLogo} alt="Edit" />} />
                                <ActionButton  action={"delete"} setIsForm={setIsForm} icon={<img className= "self-center" src={deleteLogo} alt="Delete" />} />
                            </>
                                }
                        </div>
                    { (isForm.edit || isForm.delete || isForm.add) ? 
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