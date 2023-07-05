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


        function scrollTo(page :number){
            if(parallaxRef.current){
                parallaxRef.current.scrollTo(page);
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
            return (
                <FormProvider key={note._id} isAdd={isAdd} setIsAdd={setIsAdd}>
                    <NoteProvider passedNote={note}>
                        <Page offset={index}/>
                    </NoteProvider>
                </FormProvider>
                
            )
        })

        noteParallaxList.push(

                <FormProvider key={"blank"} isAdd={isAdd} setIsAdd={setIsAdd}>
                    <NoteProvider passedNote={{
                        _id: "blank",
                        title: "",
                        body: "",
                        userName: ""
                    }}>
                        <Page offset={noteParallaxList.length+1}/>
                    </NoteProvider>
                </FormProvider>
        )

        return (
            <div className='p-10 flex flex-col gap-6'>
                <div className='py-10 self-end'>
                    {/* <ActionButton handleClick={()=>{setIsAdd(true)}} icon={<img className="self-center" src={addLogo} alt="Edit" />}/> */}
                </div>
                <Parallax pages={noteParallaxList.length+1} ref={parallaxRef} horizontal className='binding'>
                    {noteParallaxList}
                </Parallax>
            </div>
        )
    }

    return <BaseNoteParallax />
}