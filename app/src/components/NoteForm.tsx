import { useForm } from "react-hook-form";
import { NoteData, useNotesContext } from "../context/NotesContext";
import { useUserContext } from "../context/UserContext";
import { useQueryClient} from "@tanstack/react-query";
import { useAddNote, useEditNote, useDeleteNote } from "../hooks/customHooks";


interface NoteFormProps {
    cachedNote : NoteData;
    setCachedNote : React.Dispatch<React.SetStateAction<NoteData>>;
}

export default function NoteForm(props : NoteFormProps){

    
    const {isForm, setIsForm, noteId, setNoteId} = useNotesContext();
    const {user} = useUserContext();

    const queryClient = useQueryClient();

   const addMutation = useAddNote(setNoteId);
   const editMutation = useEditNote(queryClient, props.setCachedNote);
   const deleteMutation = useDeleteNote(noteId, setNoteId, props.setCachedNote);
    

    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            defaultValues: {
                title : `${props.cachedNote.title}`,
                body : `${props.cachedNote.body}`
            }
        }
    );

    interface FormData{
        title : string;
        body : string;
    }

    function onSubmit(data: FormData){

        try{
            if(isForm.add){
                addMutation.mutate({data,user});
            }
            else if(isForm.edit){
                editMutation.mutate({data, noteId, user});
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
            setIsForm((prevState)=>{
                return {
                    ...prevState,
                    add : false,
                    edit : false,
                    delete : false
                }
            })
        }
    }
        

    function formHeader(){

        if(isForm.add){
            return "Add Note"
        }
        else if(isForm.edit){
            return "Edit Note"
        }
        return "Are you sure you want to delete this note?"
    }

    function formText(){
        if(isForm.delete){
            return (
            <>
                <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
            </>
            )
        }
        else {
            return (
                <>
                    <input className="border-2 border-gray-300 focus:outline-none" placeholder="Title" {...register("title", {required: "This field is required", minLength :{value: 4, message: "This title is too short"}})}/>
                    <p className="text-red-600 italic font-thin text-sm">{errors.title?.message?.toString()}</p>
                    
                    <textarea className="h-36 border-2 border-gray-300 focus:outline-none" placeholder="Body" {...register("body", {required: "This field is required", minLength :{value: 4, message: "This title is too short"}})} />
                    <p className="text-red-600 italic font-thin text-sm">{errors.body?.message?.toString()}</p>
                    <p className="text-red-600 italic font-thin text-sm">{``}</p>
                    <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
                </>
            )
        }

    }


    return (
        <div className="w-96  mx-auto mt-20 border border-gray-800">
        <form id="user" className="p-6 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-10">
                    <button type="button" className="self-end font-bold" onClick={()=>{
                        setIsForm((prevState)=>{return {...prevState, add: false, edit : false, delete: false}})
                        const cachedNote = JSON.parse(localStorage.getItem('note') || "");
                        props.setCachedNote((prevNote)=>{
                            return {
                                ...prevNote,
                                ...cachedNote
                            }
                        })
                }}>X</button>
                    <label className="mb-10 text-center text-2xl"> {formHeader()}</label>
                </div>
                {formText()}
        </form>
        </div>
    )

}