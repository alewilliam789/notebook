import {useEffect} from 'react';

import {useNotesContext } from "../context/NotesContext"


export default function Sidebar(): React.JSX.Element{

    const {notesData, setNoteIndex} = useNotesContext();

    useEffect(()=>{
        localStorage.setItem('notes',JSON.stringify(notesData))
    },[notesData])


    function handleClick(passedIndex: number){
        localStorage.setItem('note',JSON.stringify(notesData[passedIndex]))
        setNoteIndex(passedIndex);
    }


    const liList = notesData.map((note, index) =>{
        return <li value={index} onClick={(event)=>{handleClick(event.currentTarget.value)}} key={index}>{note.title}</li>
    })

    return (
        <div className="">
            <ol>
                {liList}
            </ol>
        </div>
    )
}