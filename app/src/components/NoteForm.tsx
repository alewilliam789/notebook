import { useForm } from "react-hook-form";
import { useQueryClient} from "@tanstack/react-query";


import { useUserContext } from "../context/UserContext";
import { useFormContext } from "../context/FormContext";

import { useAddNote, useEditNote, useDeleteNote } from "../hooks/customHooks";

import AdaptableTextArea from "./AdaptableTextArea";
import MutationInput from "./MutationInput";
import SubmitButton from "./SubmitButton";
import { useNoteContext } from "../context/NoteContext";

import { FormData } from "../interfaces/universalTypes";
import ErrorText from "./ErrorText";



export default function NoteForm(){

    const {currentNote, setCurrentNote} = useNoteContext()
    

    
    const {user} = useUserContext();

    const {state, dispatch} = useFormContext()

    const queryClient = useQueryClient();

    const addMutation = useAddNote(queryClient);
    const editMutation = useEditNote(queryClient, currentNote._id, setCurrentNote);
    const deleteMutation = useDeleteNote(currentNote._id, queryClient);


    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            defaultValues :{
                title: currentNote.title,
                body: currentNote.body
            }
        }
    );

    
    function onSubmit(data: FormData){

        try{
            if(state.add){
                addMutation.mutate({data, user});
            }
            else if(state.edit){
                editMutation.mutate({data, user});
            }
            else{
                deleteMutation.mutate();
            }
        }
        catch(error){
           if(error instanceof Error){
            throw new Error(error.message.toString())
           }
           else{
            throw new Error('Unknown error')
           }
        }
        finally{
            dispatch({type:"all"})
        }
    }
    

    function FormText(){
        if(state.delete){
            return (
            <>
                <label className="mb-16 font-bold text-center text-2xl pb-10">Are you sure you want to delete this note?</label>
            </>
            )
        }
        else {
            return (
                <>
                    <MutationInput register={register} name="title" />
                    <ErrorText errorMessage={errors.title?.message?.toString()} />
                    <AdaptableTextArea body={currentNote.body} register={register}/>
                    <ErrorText errorMessage={errors.body?.message?.toString()} />
                </>
            )
        }

    }


    return (
        <>
        <form id="user" className="h-max p-6 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-10">
                    <button type="button" className="self-end font-bold" onClick={()=>{
                        dispatch({type:"all"})
                        }}>X</button>
                </div>
                <FormText />
                <SubmitButton />
        </form>
        </>
    )

}