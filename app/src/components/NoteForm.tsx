import { set, useForm } from "react-hook-form";
import { useNotesContext } from "../context/NotesContext";



export default function NoteForm(){


    const {currentNote, setCurrentNote, noteRef, setIsEditing, setNotesData} = useNotesContext()


    const {register, handleSubmit, formState: {errors}} = useForm(
        {defaultValues: {
            title : `${currentNote.title}`,
            body : `${currentNote.body}`
        }}
    );

    interface FormData{
        title : string;
        body : string; 
    }

    async function onSubmit(data: FormData ){
        setCurrentNote((prevNote)=>{
            return {
                ...prevNote,
                ...data
            }
        });
        
        setNotesData((prevNotesData)=>{
            const newNotesData = prevNotesData.map((note, index) => {
                if(index == noteRef.current){
                    return {...currentNote, ...data}
                }
                else{
                    return note
                }
            }
            )

            return newNotesData
            })
        setIsEditing((prevState)=>{
            return !prevState
        })
    }


    return (
        <div className="w-96  mx-auto mt-20 border border-gray-800">
        <form id="user" className="p-10 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-10 text-center text-2xl"> Edit Note</label>
                <input className="border-2 border-gray-300 focus:outline-none" placeholder="Title" {...register("title", {required: "This field is required", minLength :{value: 4, message: "This title is too short"}})}/>
                <p className="text-red-600 italic font-thin text-sm">{errors.title?.message?.toString()}</p>
                
                <textarea className="h-36 border-2 border-gray-300 focus:outline-none" placeholder="Body" {...register("body", {required: "This field is required", minLength :{value: 4, message: "This title is too short"}})} />
                {/* <p className="text-red-600 italic font-thin text-sm">{handleUserVerification()}</p> */}
                <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
        </form>
        </div>
    )









}