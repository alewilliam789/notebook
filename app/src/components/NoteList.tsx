import {  Fragment } from 'react';
import { useQueryClient } from '@tanstack/react-query';


import { useNotes } from '../hooks/customHooks';
import { useUserContext } from '../context/UserContext';

import Note from './Note';









export default function NoteList(){

    const {user} = useUserContext();



    const { data } = useNotes(user);
    const queryClient = useQueryClient();


    if(typeof data != 'undefined'){
        const noteList = data.map((note) =>{
            queryClient.setQueryData(['note', {id : note._id}], note)
            return (
            <Fragment key={note._id}>
                    <Note {...note} />
            </Fragment>)
        })
        return (
            <div className='flex flex-col gap-6'>
                {noteList}
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