import { useEffect, useRef } from "react";
import Vara from "vara";


interface VaraTextProps {
    text : string
}

export default function VaraText({text}: VaraTextProps){

    const renderCount = useRef(0)

    useEffect(() => {
        if (renderCount.current <1){
            const vara = new Vara(
            "#vara-container",
            "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
            [
                {
                text: text,
                fontSize: 40,
                strokeWidth: 0.7,
                },
            ]
            );
            renderCount.current ++;
        }
      }, [text]);
    
      return <div id="vara-container"></div>;
    }