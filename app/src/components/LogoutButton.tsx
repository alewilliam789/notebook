import { useNavigate } from "react-router-dom"
import { useNotesContext } from "../context/NotesContext";


export default function LogoutButton(){

    const {setNoteId} = useNotesContext()

    const navigate = useNavigate();

    function handleClick(){
        setNoteId("")
        localStorage.clear();
        navigate('/')
    }


    return (
        <>
        <button onClick={handleClick}>Logout</button>
        </>
    )
}