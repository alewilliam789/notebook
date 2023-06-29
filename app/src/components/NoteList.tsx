import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';


import { useNotes } from '../hooks/customHooks';
import { useUserContext } from '../context/UserContext';
import { NoteProvider } from '../context/NoteContext';
import { FormProvider} from '../context/FormContext';

import addLogo from '../images/add.png'


import ActionButton from './ActionButton';

import { NoteData } from '../interfaces/universalTypes';
import NotePanel from './NotePanel';








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


        if(isAdd){
            return (
                <>
                <FormProvider isAdd={isAdd} setIsAdd={setIsAdd}>
                    <NoteProvider passedNote={{_id: "", title: "", body: ""}}>
                        <NotePanel />
                    </NoteProvider>
                </FormProvider>
                </>
            ) 
        }


        const noteList = definedData.map((note) =>{
            queryClient.setQueryData(['note', {id : note._id}], note)
            return (
                <FormProvider key={note._id} isAdd={isAdd} setIsAdd={setIsAdd}>
                    <NoteProvider passedNote={note}>
                        <NotePanel />
                    </NoteProvider>
                </FormProvider>
                
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

    return <BaseNoteList />
}