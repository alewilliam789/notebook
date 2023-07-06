import { useQuery, useMutation, QueryClient} from "@tanstack/react-query";

import { NoteData, FormData } from "../type";
import { fetchNote, fetchNotes, addNote, editNote, deleteNote } from "../API";





export function useNote(_id :string) { 
        return  useQuery<NoteData, Error>(['note', {id : _id}], ()=> fetchNote(_id));
}

export function useNotes(user : string) { 
        return  useQuery<NoteData[], Error>(['notes'], ()=>fetchNotes(user));
}

interface Mutate {
        data : FormData,
        user : string
}

export function useAddNote(queryClient : QueryClient){
        return useMutation(
                {
                    mutationFn: ({data, user} : Mutate) => {
                        return addNote(data,user)
                    },
                    onSuccess : () => {
                        queryClient.resetQueries();
                    },
                    onError: (e: Error) => {
                        throw new Error(e.message.toString())
                    }
                }
                )         
}

export function useEditNote(queryClient : QueryClient, _id : string, setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>){
        return useMutation(
                {
                    mutationFn : ({data, user}: Mutate) => {
                        setCurrentNote((prevNote)=>{
                                return {
                                        ...prevNote,
                                        ...data
                                }
                        })
                        return editNote(data,_id, user)
                    },
                    onSuccess : (data) => {
                        queryClient.setQueryData(['note',{id : data._id}],data)
                    },
                    onError: (e: Error) => {
                        throw new Error(e.message.toString())
                    }
                })
}

export function useDeleteNote(_id: string, queryClient : QueryClient){
        return useMutation({
                mutationFn : () => {
                    queryClient.removeQueries(['note',{id : _id}])
                    queryClient.resetQueries();
                    return deleteNote(_id)
                },
                onSuccess: () => {
                        queryClient.refetchQueries()
                },
                onError: (e: Error) => {
                        throw new Error(e.message.toString())
                    }
            })
}


