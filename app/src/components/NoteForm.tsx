import { set, useForm } from "react-hook-form";
import { useNotesContext } from "../context/NotesContext";
import { useState } from "react";



export default function NoteForm(){


    const {currentNote, setCurrentNote, noteRef, setIsEditing, setNotesData} = useNotesContext()


    const {register, handleSubmit, formState: {errors}} = useForm(
        {defaultValues: {
            title : `${currentNote.title}`,
            body : `${currentNote.body}`
        }}
    );

    const [errorMessage, setErrorMessage] = useState({currentError : ""})

    interface FormData{
        title : string;
        body : string; 
    }

    async function editNote(data : FormData){
        const response = await fetch(`https://tayjournal-api.herokuapp.com/notes/${currentNote["_id"]}`,
        {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({...data}),
        }
        )

        if(response.status == 304){
            setErrorMessage((prevMessage)=> {
                return {
                    ...prevMessage,
                    currentError : "Note was not updated"
                }
            })
        }
        else if(response.status == 400){
            setErrorMessage((prevMessage)=> {
                return {
                    ...prevMessage,
                    currentError : "your note was not found or we had trouble updating it. Try again later."
                }
            })
        }
    }


    async function onSubmit(data: FormData ){

        editNote(data)

       if(!errorMessage.currentError){

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

    }


    return (
        <div className="w-96  mx-auto mt-20 border border-gray-800">
        <form id="user" className="p-10 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-10 text-center text-2xl"> Edit Note</label>
                <input className="border-2 border-gray-300 focus:outline-none" placeholder="Title" {...register("title", {required: "This field is required", minLength :{value: 4, message: "This title is too short"}})}/>
                <p className="text-red-600 italic font-thin text-sm">{errors.title?.message?.toString()}</p>
                
                <textarea className="h-36 border-2 border-gray-300 focus:outline-none" placeholder="Body" {...register("body", {required: "This field is required", minLength :{value: 4, message: "This title is too short"}})} />
                {/* <p className="text-red-600 italic font-thin text-sm">{handleUserVerification()}</p> */}
                <p className="text-red-600 italic font-thin text-sm">{errorMessage.currentError}</p>
                <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
        </form>
        </div>
    )









}