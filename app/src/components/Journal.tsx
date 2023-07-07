import {useState} from 'react';
import { useUserContext } from "../context/UserContext";
import VaraText from "./VaraText";

import NoteParallax from './NoteParallax';
import ActionButton from './ActionButton';

import exitLogo from '../assets/icons/exit.png';

export default function Journal(){

    const {user} = useUserContext()

    const [open, setOpen] = useState<boolean>(false);

    const [openStyles, setOpenStyles] = useState<string>("journal closed");



    function handleClick(){

            setOpen(true)
            if(!open){
                setOpenStyles("journal-open open")
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
                    <div className="px-2 h-32 w-max mt-32 flex justify-center bg-white">
                         <div className="self-center">
                            <VaraText text={`Hello ${user}`} />
                        </div>
                     </div>
                </>)
        }

    }




    return  (
        <div className={`flex flex-column justify-center ${openStyles}`} onClick={open ? undefined : handleClick}>
            <JournalSwitcher />
            <div>{open ? <ActionButton icon={exitLogo} handleClick={()=>{
                        setOpen(false);
                        setOpenStyles("journal closed")
                     }} 
                     action='Exit' 
                     position='self-end'
                     transition='animate__animated animate__fadeIn animate__delay-1s'/>: null}</div>
        </div>
    )
}