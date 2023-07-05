import { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {Parallax, IParallax } from '@react-spring/parallax';
import { ThreeDots } from 'react-loader-spinner';


import { useNotes } from '../hooks/customHooks';
import { useUserContext } from '../context/UserContext';
import { NoteProvider } from '../context/NoteContext';
import { FormProvider} from '../context/FormContext';

import addLogo from '../assets/icons/add.png';


import ActionButton from './ActionButton';

import { NoteData } from '../type';
import Page from './Page';






export default function NoteParallax(){

    const {user} = useUserContext();

    const [isAdd, setIsAdd] = useState<boolean>(false)



    const {data, isFetching, isLoading} = useNotes(user);
    const queryClient = useQueryClient();




    function isUndefined(data : NoteData[] | undefined){
        if(typeof data != 'undefined'){
            return data
        }
        return []
    }

    function BaseNoteParallax() {

        const definedData = isUndefined(data)

        const parallaxRef = useRef<IParallax>(null)

        function scrollTo(page : number){
            if(parallaxRef.current){
                parallaxRef.current.scrollTo(page)
            }
        }



        if(isFetching || isLoading){
            return (
                <div className='pt-32 flex justify-center'>
                    <ThreeDots 
                      color= '#EF4444' 
                    />
                </div>
            )
        }


        const noteParallaxList = definedData.map((note, index) =>{
            queryClient.setQueryData(['note', {id : note._id}], note)

            if(index == definedData.length-1){
                return (
                    <FormProvider key={note._id} isAdd={isAdd} setIsAdd={setIsAdd}>
                        <NoteProvider passedNote={note}>
                            <Page offset={index} handleClick={()=>scrollTo(0)} last={true} />
                        </NoteProvider>
                    </FormProvider>
                    
                )
            }
            return (
                <FormProvider key={note._id} isAdd={isAdd} setIsAdd={setIsAdd}>
                    <NoteProvider passedNote={note}>
                        <Page offset={index} handleClick={()=>scrollTo(index+1)}/>
                    </NoteProvider>
                </FormProvider>
                
            )
        })

        return (
            <div className='p-10 flex flex-col justify-center gap-6'>
                <div className='relative h-[800px] w-[900px]'>
                    <Parallax pages={noteParallaxList.length} ref={parallaxRef} horizontal className='binding'>
                        {noteParallaxList}
                    </Parallax>
                </div>
            </div>
        )
    }

    return <BaseNoteParallax />
}