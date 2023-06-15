import { ReactNode, createContext, useContext, useState} from "react";

export interface NoteData  {
    _id : string;
    title: string;
    body: string;
    userName?: string;
}


interface NotesContextProps {

    isForm: FormBooleans;
    setIsForm: React.Dispatch<React.SetStateAction<FormBooleans>>

    noteId: string;
    setNoteId: React.Dispatch<React.SetStateAction<string>>

}

export interface FormBooleans {
    edit : boolean,
    add : boolean,
    delete: boolean
}

export const NotesContext = createContext<NotesContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}


export const NotesProvider = ({children}: ProviderProps) => {


    const [isForm, setIsForm] = useState<FormBooleans>({"edit" :false, "add": false, "delete": false});



    const [noteId, setNoteId] = useState<string>(localStorage.getItem('noteid') || "");



    return <NotesContext.Provider value={{noteId, setNoteId,isForm, setIsForm}}>{children}
        </NotesContext.Provider>
};

export const useNotesContext = () => {
    const notesContext = useContext(NotesContext);

    if(!notesContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return notesContext
}