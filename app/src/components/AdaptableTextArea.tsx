import { useState, useLayoutEffect, useRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface AdaptableTextAreaProps {
    body : string, 
    register: UseFormRegister<{
        title: string;
        body: string;
    }>
}


export default function AdaptableTextArea({body, register}: AdaptableTextAreaProps){


    const [value, setValue] = useState(body);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useLayoutEffect(()=>{
    if(textAreaRef.current){
        textAreaRef.current.style.height = "0";
        const scrollHeight = textAreaRef.current.scrollHeight;

        textAreaRef.current.style.height = scrollHeight + "px";
    }
    },[textAreaRef, value]);


    const { ref, onChange, ...rest } = register('body');

    

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
    };

 return (
    <textarea
                        className="pattern content focus:outline-none"
                        ref={(e)=>{
                            ref(e);
                            textAreaRef.current = e;
                        }}
                        rows={1}
                        value={value}
                        placeholder="Add your journal entry here..."
                        onChange={e=>{ 
                            onChange(e);
                            handleChange(e)
                        }}
                        {...rest}
                    />
 )
}