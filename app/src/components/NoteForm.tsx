import { useForm } from "react-hook-form";
import { NoteData, useNotesContext } from "../context/NotesContext";
import { useUserContext } from "../context/UserContext";



interface NoteFormProps {
    currentNote : NoteData;
    setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>;
}

export default function NoteForm(props : NoteFormProps){


    const { setNotesData, isForm, setIsForm} = useNotesContext();
    const {user} = useUserContext();


    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            defaultValues: {
                title : `${props.currentNote.title}`,
                body : `${props.currentNote.body}`
            }
        }
    );

    interface FormData{
        title : string;
        body : string;
    }

    async function editNote(data : FormData){


        setNotesData((prevNotesData)=>{
            const newNotesData = prevNotesData.map((note)=>{
                if(note._id == props.currentNote._id){
                    return {
                        ...props,
                        ...data
                    }
                }
                else {
                    return note
                }
                })
                return newNotesData
            });

        localStorage.setItem('note',JSON.stringify({...props.currentNote, ...data}))
        

        const response = await fetch(`https://tayjournal-api.herokuapp.com/notes/${props.currentNote._id}`,
        {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({...data}),
        }
        )

        if(response.status == 304){
            throw new Error("Note was not updated")
        }
        else if(response.status == 400){
            throw new Error("Your note was not found or we had trouble updating it. Try again later.");
        }
    }

    async function addNote(data: FormData){


        const response = await fetch(`https://tayjournal-api.herokuapp.com/notes`,
        {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({...data,userName : user}),
        }
        )

        if(response.status == 201){
            response.json().then((data)=>{

                setNotesData((prevNotesData)=>{
                    return [...prevNotesData, {...data}]
                })

                localStorage.setItem('note',JSON.stringify({...data}));
            })

            

        }
        else if(response.status == 500){
            throw new Error("Note was not created.");
        }
        else if(response.status == 400){
            throw new Error("Your note was not found or we had trouble updating it. Try again later.");
        }

    }

    async function deleteNote(){



        setNotesData((prevNotesData)=>{
                const newNotesData = prevNotesData.filter((note)=>{
                    note._id !== props.currentNote._id
                })
                return newNotesData
            });
        localStorage.setItem('note',JSON.stringify({"title": "", "body": ""}))
        
        const response = await fetch(`https://tayjournal-api.herokuapp.com/notes/${props.currentNote._id}`,
        {
            method: "DELETE",
        }
        )

        if(response.status == 404){
            throw new Error(`Could not find note this note`);
        }
        else if(response.status == 400){
            throw new Error("Your note was not found or we had trouble deleting it. Try again later.");
        }
    }


    async function onSubmit(data: FormData ){
        try {
            if(isForm.add){
                addNote(data)
            }
            else if(isForm.edit){
                editNote(data)
            }
            else if(isForm.delete){
                deleteNote()
            }
        }
        catch(e: unknown){
            if(e instanceof Error){
                throw(e);
           }

        }

        setIsForm((prevState)=>{
            return {
                ...prevState,
                add : false,
                edit : false,
                delete : false
            }
            })
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
                    <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
                </>
            )
        }

    }


    return (
        <div className="w-96  mx-auto mt-20 border border-gray-800">
        <form id="user" className="p-6 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-10">
                    <button type="button" className="self-end font-bold" onClick={()=>{setIsForm((prevState)=>{return {...prevState, add: false, edit : false, delete: false}})}}>X</button>
                    <label className="mb-10 text-center text-2xl"> {formHeader()}</label>
                </div>
                {formText()}
        </form>
        </div>
    )

}