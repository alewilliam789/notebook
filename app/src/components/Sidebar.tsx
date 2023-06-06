import {useNotesContext } from "../context/NotesContext"


export default function Sidebar(): React.JSX.Element{

    const {notesData, handleClick} = useNotesContext();



    if(!notesData.Notes.length){
        return <li> Loading....</li>
    }
    

    const liList = notesData.Notes.map((note, index) =>{
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