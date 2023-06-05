import { ReactNode, createContext, useContext, useState, useEffect, useRef, MutableRefObject} from "react";
import { useCookies } from "react-cookie";

export interface Note  {
    id : string;
    title: string;
    body: string;
    userName: string;
}

type NotesData = {
    Notes : Note[];
}

interface NotesContextProps {
    notesData : NotesData;
    noteRef : MutableRefObject<number | null>;
    handleClick : (noteRef : number) => MutableRefObject<number | null>;
    setNotesData: (notesData : NotesData ) => void;

}

export const NotesContext = createContext<NotesContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}

export const NotesProvider = ({children}: ProviderProps) => {
    const [notesData, setNotesData] = useState<NotesData>({
        Notes: []
    });

    const noteRef = useRef<number | null>(null)

    const [cookies] = useCookies(['user']);

    


    function handleClick(noteIndex: number){
        noteRef.current = noteIndex
        return noteRef
    }

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
                setNotesData({
                    ...notesData,
                    Notes : data
                })
            })   
        }
    },[cookies.user]
    )

    return <NotesContext.Provider value={{notesData, setNotesData, noteRef, handleClick}}>{children}
        </NotesContext.Provider>
};

export const useNotesContext = () => {
    const notesContext = useContext(NotesContext);

    if(!notesContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return notesContext
}