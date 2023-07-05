import {useState} from 'react';
import { useUserContext } from "../context/UserContext";
import VaraText from "./VaraText";

import NoteParallax from './NoteParallax';

export default function Journal(){

    const {user} = useUserContext()

    const [open, setOpen] = useState(false);



    function handleClick(){

        if(!open){
            setOpen(true)
        }
    }

    function JournalSwitcher(){

        if(open){
            return (
            <>
                <NoteParallax />
            </>)
        }
        else{
            return (
                <>
                    <div className="h-32 w-64 p-6 mt-32 flex justify-center bg-white">
                         <div className="self-center">
                            <VaraText text={`Hello ${user}`} />
                        </div>
                     </div>
                </>)
        }

    }




    return  (
        <div className="bg-navy w-[700px] h-[800px] mx-auto flex flex-column justify-center rounded-xl journal" onClick={handleClick}>
            <JournalSwitcher />
        </div>
    )
}