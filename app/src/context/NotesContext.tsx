import { ReactNode, createContext, useContext, useState, useEffect, useRef, MutableRefObject} from "react";
import { useCookies } from "react-cookie";

export interface Note  {
    _id : string;
    title: string;
    body: string;
    userName: string;
}


interface NotesContextProps {
    notesData : Note[];
    currentNote : Note;
    noteRef : MutableRefObject<number>;
    isEditing : boolean;
    setIsEditing : React.Dispatch<React.SetStateAction<boolean>>;
    setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;
    setCurrentNote : React.Dispatch<React.SetStateAction<Note>>;

}

export const NotesContext = createContext<NotesContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}


export const NotesProvider = ({children}: ProviderProps) => {
    const [notesData, setNotesData] = useState<Note[]>([]);

    const [isEditing, setIsEditing] = useState(false);

    const noteRef = useRef<number>(0)

    const [cookies] = useCookies(['user']);

    const [currentNote, setCurrentNote] =  useState<Note>(notesData[noteRef.current]);

    

    async function fetchNotes() : Promise<Note[]>{
        const response = await fetch(`https://tayjournal-api.herokuapp.com/notes/${cookies.user}`,
        {
            method: "GET"
        }
        )

        return response.json() as Promise<Note[]>;
    }

    useEffect(() => {
        if(cookies.user){
            fetchNotes().then((data)=>{
                setNotesData([...data])
            })
        }
    },[cookies.user]
    )

    return <NotesContext.Provider value={{notesData, setNotesData, currentNote, setCurrentNote, isEditing, setIsEditing, noteRef}}>{children}
        </NotesContext.Provider>
};

export const useNotesContext = () => {
    const notesContext = useContext(NotesContext);

    if(!notesContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return notesContext
}