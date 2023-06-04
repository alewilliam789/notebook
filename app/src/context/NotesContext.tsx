import { ReactNode, createContext, useContext, useState, useEffect, useRef, MutableRefObject} from "react";
import { useUserContext } from "./UserContext";

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
    noteRef : MutableRefObject<number>;
    handleClick : (noteRef : number) => MutableRefObject<number>;
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

    const noteRef = useRef(0)

    const {userData} = useUserContext();

    function handleClick(noteIndex: number){
        noteRef.current = noteIndex
        return noteRef
    }

    async function fetchNotes() : Promise<Note[]>{
        const response = await fetch(`https://tayjournal-api.herokuapp.com/notes/${userData?.userName}`,
        {
            method: "GET"
        }
        )

        return response.json() as Promise<Note[]>;
    }


    useEffect(() => {
        if(userData.userName){
            fetchNotes().then((data)=>{
                setNotesData({
                    ...notesData,
                    Notes : data
                })
            })   
        }
    },[userData.userName]
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