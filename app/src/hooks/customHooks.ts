import { useEffect, useState } from "react";
import { NoteData } from "../context/NotesContext";
import { fetchNote, fetchNotes, addNote, editNote, deleteNote } from "../FetchAPI";
import { useQuery, useMutation, QueryClient} from "@tanstack/react-query";





export function useNote(_id :string) { 
        return  useQuery<NoteData, Error>(['note', {id : _id}], ()=> fetchNote(_id));
}

export function useNotes(user : string) { 
        return  useQuery<NoteData[], Error>(['notes'], ()=>fetchNotes(user));
}

type cachedReturn = [NoteData, React.Dispatch<React.SetStateAction<NoteData>>];



export function useCachedNote(){
       const [cachedNote,setCachedNote] = useState<NoteData>({"_id" : "", "title":"","body":""});
       useEffect(()=>{
        const localNote = JSON.parse(localStorage.getItem('note')||"")
        if(localNote){
                setCachedNote((prevNote)=>{
                        return {
                          ...prevNote,
                          ...localNote
                        }
                })
        }
       },[])

       const cachedReturn : cachedReturn = [cachedNote,setCachedNote];
       return cachedReturn
}


interface FormData {
        title : string;
        body : string;
}





interface addMutate {
        data : FormData,
        user : string
}

export function useAddNote(setNoteId : React.Dispatch<React.SetStateAction<string>>){
        return useMutation(
                {
                    mutationFn: ({data, user} : addMutate) =>{
                        return addNote(data,user)
                    },
                    onSuccess: () => {
                        setNoteId('');
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

export function useDeleteNote(noteId: string, setNoteId : React.Dispatch<React.SetStateAction<string>>, setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>){
        return useMutation({
                mutationFn : () => {
                        setCurrentNote((prevNote)=>{
                                return {
                                        ...prevNote,
                                        "title" : "",
                                        "body" : ""
                                }
                        })
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


