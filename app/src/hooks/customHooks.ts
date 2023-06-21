import { useEffect, useState } from "react";
import { useQuery, useMutation, QueryClient} from "@tanstack/react-query";

import { NoteData } from "../components/Note";
import { fetchNote, fetchNotes, addNote, editNote, deleteNote } from "../FetchAPI";





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





interface Mutate {
        data : FormData,
        user : string
}

export function useAddNote(queryClient : QueryClient){
        return useMutation(
                {
                    mutationFn: ({data, user} : Mutate) =>{
                        return addNote(data,user)
                    },
                    onSuccess: (data : NoteData)=>{
                        queryClient.setQueryData(['note', {id : data._id}], data);
                        queryClient.refetchQueries();

                    },
                    onError: (e: Error) =>{
                        throw new Error(e.message.toString())
                    }
                }
                )         
}




interface Mutate {
        data : FormData,
        user : string
}

export function useEditNote(queryClient : QueryClient, _id : string, setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>){
        return useMutation(
                {
                    mutationFn : ({data, user}: Mutate) =>{
                        setCurrentNote((prevNote)=>{
                                return {
                                        ...prevNote,
                                        ...data
                                }
                        })
                        return editNote(data,_id, user)
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

export function useDeleteNote(_id: string, queryClient :QueryClient, setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>){
        return useMutation({
                mutationFn : () => {
                        setCurrentNote((prevNote)=>{
                                return {
                                        ...prevNote,
                                        "title" : "",
                                        "body" : ""
                                }
                        })
                    return deleteNote(_id)
                },
                onSuccess: () =>{
                        localStorage.setItem('note',JSON.stringify({title : "", body: ""}))
                        queryClient.refetchQueries({ type: 'active' });
                },
                onError: (e: Error) =>{
                        throw new Error(e.message.toString())
                    }
            })
}


