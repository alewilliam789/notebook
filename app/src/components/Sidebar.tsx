import {useNotesContext } from "../context/NotesContext"


export default function Sidebar(): React.JSX.Element{

    const {notesData, noteRef, setCurrentNote} = useNotesContext();

    function handleClick(noteIndex: number){
        noteRef.current = noteIndex
        setCurrentNote((prevNote) => {
            return {
                ...prevNote,
                ...notesData[noteRef.current]
            }
        })
    }




    if(!notesData.length){
        return <li> Loading....</li>
    }
    

    const liList = notesData.map((note, index) =>{
        return <li value={index} onClick={(event)=>{handleClick(event.currentTarget.value)}} key={index}>{note.title}</li>
    
    })

    return (
        <div className="">
            <ol>
                {liList}
            </ol>
        </div>
    )
}