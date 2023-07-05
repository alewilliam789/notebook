import { ParallaxLayer } from "@react-spring/parallax";
import NotePanel from './NotePanel';



interface PageProps {
    offset: number;
    handleClick?: () => void
  }

export default function Page({ offset, handleClick} : PageProps){

    return(
        <>
        <ParallaxLayer offset={offset} speed={0.3}>
            <NotePanel />
        </ParallaxLayer>
        </>)
};