import { useForm } from "react-hook-form";
import { useQueryClient} from "@tanstack/react-query";

import { useUserContext } from "../context/UserContext";
import { useMutationContext } from "../context/MutationContext";
import { useAddNote, useEditNote, useDeleteNote } from "../hooks/customHooks";
import { useState, useRef, useLayoutEffect } from "react";
import { NoteData } from "./Note";


interface NoteFormProps {
    currentNote : NoteData;
    setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>;
}

interface FormData{
    title : string;
    body : string;
}


export default function NoteForm({currentNote, setCurrentNote} : NoteFormProps){
    

    
    const {user} = useUserContext();

    const {state, dispatch} = useMutationContext()

    const queryClient = useQueryClient();

    const addMutation = useAddNote(queryClient);
    const editMutation = useEditNote(queryClient, currentNote._id ? currentNote._id : "randokey", setCurrentNote);
    const deleteMutation = useDeleteNote(currentNote._id ?  currentNote._id : "randokey", queryClient);

    const [value, setValue] = useState(currentNote.body);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useLayoutEffect(()=>{
    if(textAreaRef.current){
        textAreaRef.current.style.height = "0";
        const scrollHeight = textAreaRef.current.scrollHeight;

        textAreaRef.current.style.height = scrollHeight + "px";
    }
    },[textAreaRef, value]);

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
    };

    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            defaultValues: {
                title : `${currentNote.title}`,
                body : `${currentNote.body}`
            }
        }
    );

    const { ref, onChange, ...rest } = register('body');

    
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
    

    function formText(){
        if(state.delete){
            return (
            <>
                <label className="mb-16 font-bold text-center text-2xl">Are you sure you want to delete this note?</label>
                <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
            </>
            )
        }
        else {
            return (
                <>
                    <input className="content bg-yellow-200 text-center focus:outline-none" placeholder="Title" {...register("title", {required: "This field is required", minLength :{value: 4, message: "This title is too short"}})}/>
                    <textarea
                        className="pattern content focus:outline-none"
                        ref={(e)=>{
                            ref(e);
                            textAreaRef.current = e;
                        }}
                        rows={1}
                        value={value}
                        placeholder="Add your journal entry here..."
                        onChange={e=>{ 
                            onChange(e);
                            handleChange(e)
                        }}
                        {...rest}
                    />
                    <p className="text-red-600 italic font-thin text-sm">{errors.body?.message?.toString()}</p>
                    <p className="text-red-600 italic font-thin text-sm">{``}</p>
                    <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit" />
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
                {formText()}
        </form>
        </>
    )

}