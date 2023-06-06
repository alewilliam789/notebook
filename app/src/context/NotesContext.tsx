import { ReactNode, createContext, useContext, useState, useEffect, useRef, MutableRefObject} from "react";
import { useCookies } from "react-cookie";

export interface Note  {
    id? : string;
    title: string;
    body: string;
    userName: string;
}

type NotesData = {
    Notes : Note[];
}

interface NotesContextProps {
    notesData : NotesData;
    currentNote : Note;
    noteRef : MutableRefObject<number | null>;
    handleClick : (noteRef : number) => void;
    setNotesData: (notesData : NotesData ) => void;
    setCurrentNote : (note : Note) => void;

}

export const NotesContext = createContext<NotesContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}

export const NotesProvider = ({children}: ProviderProps) => {
    const [notesData, setNotesData] = useState<NotesData>({
        Notes: []
    });

    const noteRef = useRef<number>(0)

    const [cookies] = useCookies(['user']);

    const [currentNote, setCurrentNote] =  useState<Note>(notesData.Notes[noteRef.current]);

    


    function handleClick(noteIndex: number){
        noteRef.current = noteIndex
        setCurrentNote((prevNote) => {
            return {
                ...prevNote,
                ...notesData.Notes[noteRef.current]
            }
        })
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

    return <NotesContext.Provider value={{notesData, setNotesData, currentNote, setCurrentNote, noteRef, handleClick}}>{children}
        </NotesContext.Provider>
};

export const useNotesContext = () => {
    const notesContext = useContext(NotesContext);

    if(!notesContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return notesContext
}