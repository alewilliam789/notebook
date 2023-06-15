
// import { useEffect } from 'react';
// import {useQueryClient} from '@tanstack/react-query';

import {NoteData, useNotesContext } from "../context/NotesContext"
import {useNotes } from '../hooks/customHooks';
import { useUserContext } from '../context/UserContext';
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";



export default function Sidebar(): React.JSX.Element{

    const {noteId, setNoteId} = useNotesContext();
    const {user} = useUserContext()

    const { data, refetch} = useNotes(user);
    const queryClient = useQueryClient();

    useEffect(()=>{
        refetch()
    },[noteId])

    function handleClick(note: NoteData){
        localStorage.setItem('note',JSON.stringify(note))
        setNoteId(note._id);
    }

    if(typeof data != 'undefined'){
        const liList = data.map((note) =>{
            localStorage.setItem('noteid',note._id);
            queryClient.setQueryData(['note', {id : note._id}], note)
            return <li value={`${note._id}`} onClick={()=>{handleClick(note)}} key={note._id}>{note.title}</li>
        })
        return (
            <div className="">
                <ol>
                    {liList}
                </ol>
            </div>
        ) 
    }
    else {
        return (
            <div>
                Loading
            </div>
        )
    }


}