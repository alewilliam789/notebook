import { ParallaxLayer } from "@react-spring/parallax";



import NotePanel from './NotePanel';
import ActionButton from "./ActionButton";

import leftLogo from '../assets/icons/left.png';
import rightLogo from '../assets/icons/right.png';
import { useFormContext } from "../context/FormContext";




interface PageProps {
    offset: number;
    leftClick: (() => void) | null;
    rightClick: (() => void) | null;
    last? : boolean;
  }

export default function Page({ offset, leftClick, rightClick, last} : PageProps){

    const { state } = useFormContext()


    if(last){
        return(
            <>
            <ParallaxLayer offset={offset} speed={1.0} className="flex gap-6">
                { offset == 0 ? null : <ActionButton icon={leftLogo} action="Left" handleClick={leftClick} position="self-center" />}
                <NotePanel />
            </ParallaxLayer>
            </>)
    }

    return(
        <>
        <ParallaxLayer offset={offset} speed={1.0} className="flex gap-6">
            {offset == 0 || state.add ? null : <ActionButton icon={leftLogo} action="Left" handleClick={leftClick}  position="self-center"/>}
            <NotePanel />
            {offset == 0 && state.add ? null :<ActionButton icon={rightLogo} action="Right" handleClick={rightClick} position="self-center"/>}
        </ParallaxLayer>
        </>)
}