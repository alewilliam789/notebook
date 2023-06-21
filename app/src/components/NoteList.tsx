import {  Fragment, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';


import { useNotes } from '../hooks/customHooks';
import { useUserContext } from '../context/UserContext';

import addLogo from '../images/add.png'

import Note from './Note';
import ActionButton from './ActionButton';









export default function NoteList(){

    const {user} = useUserContext();

    const [isAdd, setIsAdd] = useState<boolean>(false)



    const { data } = useNotes(user);
    const queryClient = useQueryClient();




    if(typeof data != 'undefined'){
        const noteList = data.map((note) =>{
            queryClient.setQueryData(['note', {id : note._id}], note)
            return (
            <Fragment key={note._id}>
                    <Note note={note} />
            </Fragment>)
        })

        if(isAdd){
            return(
                <Note note={{title: "", body: ""}} isAdd={isAdd} setIsAdd={setIsAdd} />
            )
        }


        return (
            <div className='flex flex-col gap-6'>
            <div className='self-end'>
                <ActionButton action={'add'} setIsAdd={setIsAdd} icon={<img className="self-center" src={addLogo} alt="Add" />} />
            </div>
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