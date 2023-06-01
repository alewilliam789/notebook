import { ReactNode, createContext, useContext, useState } from "react";

type Note = {
    id : string;
    title: string;
    body: string;
    userName: string;
}

type NotesData = {
    Notes : Note[];
}

interface NotesContextProps {
    notesData : NotesData | null;
    setNotesData: (notesData : NotesData ) => void;
}

export const NotesContext = createContext<NotesContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}

export const NotesProvider = ({children}: ProviderProps) => {
    const [notesData, setNotesData] = useState<NotesData | null>(null);

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