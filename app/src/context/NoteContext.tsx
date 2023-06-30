import {ReactNode, createContext, useContext, useState} from "react";
import { NoteData } from "../type";


interface NoteContextProps {

    currentNote : NoteData,
    setCurrentNote : React.Dispatch<React.SetStateAction<NoteData>>
}


export const NoteContext = createContext<NoteContextProps | null>(null);

type ProviderProps = {
    children : ReactNode,
    passedNote : NoteData

}


export const NoteProvider = ({children, passedNote}: ProviderProps) => {


    const [currentNote, setCurrentNote] = useState<NoteData>({...passedNote})


    return <NoteContext.Provider value={{currentNote, setCurrentNote}}>{children}
        </NoteContext.Provider>
};

export const useNoteContext = () => {
    const noteContext = useContext(NoteContext);

    if(!noteContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return noteContext
}