import {useState} from 'react';
import { useUserContext } from "../context/UserContext";
import VaraText from "./VaraText";

import NoteParallax from './NoteParallax';

export default function Journal(){

    const {user} = useUserContext()

    const [open, setOpen] = useState<boolean>(false);

    const [openStyles, setOpenStyles] = useState<string>("journal");



    function handleClick(){

        if(!open){
            setOpen(true)
            setOpenStyles("journal-open bg-day")
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
        <div className={`flex flex-column justify-center ${openStyles}`} onClick={handleClick}>
            <JournalSwitcher />
        </div>
    )
}