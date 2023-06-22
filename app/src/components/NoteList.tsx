import {  Fragment, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';


import { useNotes } from '../hooks/customHooks';
import { useUserContext } from '../context/UserContext';
import { MutationProvider} from '../context/MutationContext';

import addLogo from '../images/add.png'

import Note from './Note';
import { NoteData } from './Note';
import ActionButton from './ActionButton';









export default function NoteList(){

    const {user} = useUserContext();

    const [isAdd, setIsAdd] = useState<boolean>(false)



    const {data} = useNotes(user);
    const queryClient = useQueryClient();


    function isUndefined(data : NoteData[] | undefined){
        if(typeof data != 'undefined'){
            return data
        }
        return []
    }

    function BaseNoteList() {

        const definedData = isUndefined(data)

        const noteList = definedData.map((note) =>{
            queryClient.setQueryData(['note', {id : note._id}], note)
            return (
                <MutationProvider key={note._id} isAdd={isAdd} setIsAdd={setIsAdd}>
                <Fragment>
                        <Note note={note} />
                </Fragment>
                </MutationProvider>
                
            )
        })

        return (
            <div className='flex flex-col gap-6'>
                <div className='self-end'>
                    <ActionButton handleClick={()=>{setIsAdd(true)}} icon={<img className="self-center" src={addLogo} alt="Edit" />}/>
                </div>
                {noteList}
            </div>
        )
    }

            


    if(isAdd){
        return (
            <>
            <MutationProvider isAdd={isAdd} setIsAdd={setIsAdd}>
                <Note note={{title: "", body: ""}} />
            </MutationProvider>
            </>
        ) 
    }

    return <BaseNoteList />
}