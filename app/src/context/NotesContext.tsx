import { ReactNode, createContext, useContext, useState, useEffect} from "react";

export interface Note  {
    _id? : string;
    title: string;
    body: string;
    userName?: string;
}


interface NotesContextProps {
    notesData : Note[];
    setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;

    currentNote : Note;
    setCurrentNote : React.Dispatch<React.SetStateAction<Note>>;

    isEditing : boolean;
    setIsEditing : React.Dispatch<React.SetStateAction<boolean>>;

    isAddingNote : boolean;
    setIsAddingNote : React.Dispatch<React.SetStateAction<boolean>>;

}

export const NotesContext = createContext<NotesContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}


export const NotesProvider = ({children}: ProviderProps) => {

    const [notesData, setNotesData] = useState<Note[]>(JSON.parse(localStorage.getItem('notes')||'[]'));

    const [isEditing, setIsEditing] = useState(false);

    const [isAddingNote, setIsAddingNote] = useState(false);

    const [user] = useState(localStorage.getItem('user')?.replace(/["]+/g,"") || "");
    

    const [currentNote, setCurrentNote] =  useState<Note>({title: "", body:""});
    

    function fetchNotes() : void {
        if(user){
            fetch(`https://tayjournal-api.herokuapp.com/notes/${user}`,
            {
                method: "GET"
            }
            ).then((response)=>{
                return response.json();
            }).then((data : Note[])=>{
                setNotesData([...data])
            }).catch((error : ErrorConstructor)=>{
                throw new Error (`${error} occured on the GET request`)
            })
            }
        }

    useEffect(() => {
        fetchNotes()
        localStorage.setItem('notes',JSON.stringify(notesData))
        console.log(notesData)
    },[notesData.length])

    return <NotesContext.Provider value={{notesData, setNotesData, currentNote, setCurrentNote, isEditing, setIsEditing, isAddingNote, setIsAddingNote}}>{children}
        </NotesContext.Provider>
};

export const useNotesContext = () => {
    const notesContext = useContext(NotesContext);

    if(!notesContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return notesContext
}