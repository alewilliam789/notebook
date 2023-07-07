import { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {Parallax, IParallax } from '@react-spring/parallax';


import { useNotes } from '../hooks/customHooks';
import { useUserContext } from '../context/UserContext';
import { NoteProvider } from '../context/NoteContext';
import { FormProvider} from '../context/FormContext';

import { NoteData } from '../type';


import Page from './Page';
import ActionButton from './ActionButton';

import addLogo from '../assets/icons/add.png';






export default function NoteParallax(){

    const {user} = useUserContext();

    const [isAdd, setIsAdd] = useState<boolean>(false)



    const {data } = useNotes(user);
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
                parallaxRef.current.scrollTo(page)}
        }

        
        const noteParallaxList = definedData.map((note, index) =>{
            queryClient.setQueryData(['note', {id : note._id}], note)

            if(index == definedData.length-1){
                return (
                    <FormProvider key={note._id} isAdd={isAdd} setIsAdd={setIsAdd}>
                        <NoteProvider passedNote={note}>
                            <Page offset={index} rightClick={()=>scrollTo(index+1)} leftClick={()=>scrollTo(index-1)} last={true} />
                        </NoteProvider>
                    </FormProvider>
                    
                )
            }

            return (
                <FormProvider key={note._id} isAdd={isAdd} setIsAdd={setIsAdd}>
                    <NoteProvider passedNote={note}>
                        <Page offset={index} rightClick={()=>scrollTo(index+1)} leftClick={()=>scrollTo(index-1)}/>
                    </NoteProvider>
                </FormProvider>
                
            )
        })

        const addNoteParallax =
            (<FormProvider key={"blank"} isAdd={isAdd} setIsAdd={setIsAdd}>
                            <NoteProvider passedNote={{
                                _id: "blank",
                                title: "",
                                body: "",
                                userName: user
                            }}>
                                <Page offset={0} leftClick={undefined} rightClick={undefined} />
                            </NoteProvider>
                </FormProvider>);

        return (
            <div className='p-10 flex flex-col justify-center self-start gap-6'>
                <ActionButton icon={addLogo} handleClick={()=>setIsAdd(true)} action='Add' position='self-start' transition='animate__animated animate__fadeIn animate__delay-1s' />
                <div className='p-8 relative h-[900px] lg:w-[1200px] md:w-[800px] sm:w-[600px] min-w-[600px] overflow-hidden'>
                    <Parallax pages={isAdd ? 1 : noteParallaxList.length} ref={parallaxRef} horizontal className={`binding animate__animated animate__fadeInLeft animate__delay-1s`}>
                        {isAdd ? addNoteParallax : noteParallaxList}
                    </Parallax>
                </div>
            </div>
        )
    }

    return <BaseNoteParallax />
}