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
                <div className='flex flex-column'>
                    <ActionButton icon={exitLogo} handleClick={()=>{
                        setOpen(false);
                        setOpenStyles("journal closed")
                     }} action='Exit' />
                    <NoteParallax />
                </div>
            </>)
        }
        else{
            return (
                <>
                    <div className="h-32 w-64 mt-32 flex justify-center bg-white">
                         <div className="self-center">
                            <VaraText text={`Hello ${user}`} />
                        </div>
                     </div>
                </>)
        }

    }




    return  (
        <div className={`flex flex-column justify-center ${openStyles}`} onClick={open ? ()=>{} : handleClick}>
            <JournalSwitcher />
        </div>
    )
}