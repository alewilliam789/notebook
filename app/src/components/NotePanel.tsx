import ActionButton from "./ActionButton"
import NoteForm from './NoteForm'

import { useFormContext } from '../context/FormContext';


import editLogo from '../assets/icons/edit.png'
import deleteLogo from '../assets/icons/delete.png'

import Note from './Note';









export default function NotePanel() {


    const {state, dispatch} = useFormContext()


    function NoteSwitcher(){
        if(state.add || state.edit || state.delete){
            return (
            <>
                <NoteForm />
            </>)
        }
        return (
            <>
               <Note />
            </>
        )
    }

    return(
        <>
        <div className='w-[900px] h-[800px] bg-white rounded-sm note-shadow pattern'>
            <div className="flex justify-center content-center">
                    <section className="w-full h-full rounded-sm content">
                            <div className="p-10 flex justify-end gap-6 ">
                                <ActionButton handleClick={state.add ? null : ()=>{dispatch({type:"edit"})}} icon={<img className="self-center" src={editLogo} alt="Edit" />} />
                                <ActionButton handleClick={state.add ? null : ()=>{dispatch({type:"delete"})}} icon={<img className= "self-center" src={deleteLogo} alt="Delete" />} />
                            </div>
                        <NoteSwitcher />
                    </section>
            </div>
        </div>
        </>
    )
}