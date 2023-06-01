import { ReactNode, createContext, useContext, useState, useEffect} from "react";
import { useUserContext } from "./UserContext";

type Note = {
    id : string;
    title: string;
    body: string;
    userName: string;
}

type NotesData = {
    Notes : Note[] | null;
}

interface NotesContextProps {
    notesData : NotesData;
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

    const {userData} = useUserContext();

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

    return <NotesContext.Provider value={{notesData, setNotesData}}>{children}
        </NotesContext.Provider>
};

export const useNotesContext = () => {
    const notesContext = useContext(NotesContext);

    if(!NotesContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return notesContext
}