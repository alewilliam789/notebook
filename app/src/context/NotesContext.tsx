import { ReactNode, createContext, useContext, useState, useEffect} from "react";

export interface NoteData  {
    _id? : string;
    title: string;
    body: string;
    userName?: string;
}


interface NotesContextProps {
    notesData : NoteData[];
    setNotesData: React.Dispatch<React.SetStateAction<NoteData[]>>;

    isForm: FormBooleans;
    setIsForm: React.Dispatch<React.SetStateAction<FormBooleans>>

    noteIndex: number | null;
    setNoteIndex: React.Dispatch<React.SetStateAction<number | null>>

    user: string;



}

interface FormBooleans {
    edit : boolean,
    add : boolean,
    delete: boolean
}

export const NotesContext = createContext<NotesContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}


export const NotesProvider = ({children}: ProviderProps) => {

    const [notesData, setNotesData] = useState<NoteData[]>(JSON.parse(localStorage.getItem('notes')||'[]'));


    const [isForm, setIsForm] = useState<FormBooleans>({"edit" :false, "add": false, "delete": false});


    const [user] = useState(localStorage.getItem('user')?.replace(/["]+/g,"") || "");

    const [noteIndex, setNoteIndex] = useState<number | null>(null);
    

    function fetchNotes() : void {
        if(user){
            fetch(`https://tayjournal-api.herokuapp.com/notes/${user}`,
            {
                method: "GET"
            }
            ).then((response)=>{
                return response.json();
            }).then((data : NoteData[])=>{
                setNotesData([...data])
            }).catch((error : ErrorConstructor)=>{
                throw new Error (`${error} occured on the GET request`)
            })
            }
        }

    useEffect(() => {
        fetchNotes()
        localStorage.setItem('notes',JSON.stringify(notesData))
    },[notesData.length])

    return <NotesContext.Provider value={{notesData, setNotesData, noteIndex, setNoteIndex,isForm, setIsForm, user}}>{children}
        </NotesContext.Provider>
};

export const useNotesContext = () => {
    const notesContext = useContext(NotesContext);

    if(!notesContext){
        throw new Error("This hook needs to be used inside a NotesProvider")
    }

    return notesContext
}