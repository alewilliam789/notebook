import { ParallaxLayer } from "@react-spring/parallax";



import NotePanel from './NotePanel';
import ActionButton from "./ActionButton";

import leftLogo from '../assets/icons/left.png';
import rightLogo from '../assets/icons/right.png';



interface PageProps {
    offset: number;
    handleClick: () => void;
    last? : boolean;
  }

export default function Page({ offset, handleClick, last} : PageProps){

    if(last){
        return(
            <>
            <ParallaxLayer offset={offset} speed={1.0} className="flex gap-6">
                {offset == 0 ? null : <ActionButton icon={<img className="self-center" src={leftLogo} alt="Left" />} handleClick={handleClick} />}
                <NotePanel />
            </ParallaxLayer>
            </>)
    }

    return(
        <>
        <ParallaxLayer offset={offset} speed={1.0} className="flex gap-6">
            <NotePanel />
            <ActionButton icon={<img className="self-center" src={rightLogo} alt="Right" />} handleClick={handleClick} />
        </ParallaxLayer>
        </>)
};