import { NoteData } from "../context/NotesContext";
import { fetchNote, fetchNotes, addNote, editNote, deleteNote } from "../FetchAPI";
import { useQuery, useMutation, QueryClient} from "@tanstack/react-query";





export function useNote(_id :string) { 
        return  useQuery<NoteData, Error>(['note', {id : _id}], ()=> fetchNote(_id));
}

export function useNotes(user : string) { 
        return  useQuery<NoteData[], Error>(['notes'], ()=>fetchNotes(user));
}


interface FormData{
        title : string;
        body : string;
}





interface addMutate {
        data : FormData,
        user : string
}

export function useAddNote(queryClient : QueryClient, setNoteId : React.Dispatch<React.SetStateAction<string>>){
        return useMutation(
                {
                    mutationFn: ({data, user} : addMutate) =>{
                        return addNote(data,user)
                    },
                    onSuccess: (data : NoteData) => {
                        setNoteId(data._id);
                        localStorage.setItem('note', JSON.stringify(data))
                        queryClient.setQueryData(['note',{id : data._id}],data)
                    },
                    onError: (e: Error) =>{
                        throw new Error(e.message.toString())
                    }
        
                }
                )         
}




interface editMutate {
        data : FormData,
        noteId : string,
        user : string
}

export function useEditNote(queryClient : QueryClient, setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>){
        return useMutation(
                {
                    mutationFn : ({data, noteId, user}: editMutate) =>{
                        setCurrentNote((prevNote)=>{
                                return {
                                        ...prevNote,
                                        ...data
                                }
                        })
                        return editNote(data, noteId, user)
                    },
                    onSuccess : (data) =>{
                        localStorage.setItem('note', JSON.stringify(data))
                        queryClient.setQueryData(['note',{id : data._id}],data)
                    },
                    onError: (e: Error) =>{
                        throw new Error(e.message.toString())
                    }
                })
}

export function useDeleteNote(noteId: string, setNoteId : React.Dispatch<React.SetStateAction<string>>){
        return useMutation({
                mutationFn : () => {
                    return deleteNote(noteId)
                },
                onSuccess: () =>{
                        localStorage.setItem('note',JSON.stringify({title : "", body: ""}))
                        setNoteId("")
                },
                onError: (e: Error) =>{
                        throw new Error(e.message.toString())
                    }
            })
}


