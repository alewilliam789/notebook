import axios from "axios";

import { NoteData } from "./context/NotesContext";


interface FormData {
    title : string;
    body : string;
    _id? : string;
}





export async function fetchNotes(user : string) {
        const {data} = await axios.get(`https://tayjournal-api.herokuapp.com/notes/${user}`)
        return data
}

export async function fetchNote (_id : string){
    const {data} = await axios.get<NoteData>(`https://tayjournal-api.herokuapp.com/notes/note/${_id}`)
    return data
}



export async function editNote(formData : FormData, _id : string, user: string){
    const {data} = await axios.put<NoteData>(`https://tayjournal-api.herokuapp.com/notes/${_id}`, {...formData, userName : user})
    return data
}

export async function deleteNote(_id : string){
    await axios.delete(`https://tayjournal-api.herokuapp.com/notes/${_id}`)
}

export async function addNote(formData : FormData, user : string){
    const {data} = await axios.post<NoteData>(`https://tayjournal-api.herokuapp.com/notes/`,{...formData, userName :user})
    return data
}




    

