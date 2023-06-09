import { UseFormRegister } from "react-hook-form";

import { fieldTitle } from "../type";

interface ImportProps {
    name : fieldTitle,
    register: UseFormRegister<{
        title: string;
        body: string;
    }>
}


export default function MutationInput({register, name} : ImportProps){

    return (
    <input className="bg-white text-center text-xl focus:outline-none" placeholder={name.charAt(0).toUpperCase()+ name.slice(1)} {...register(name, {required: "This field is required", minLength :{value: 4, message: `This ${name.toLowerCase()} is too short`}})}/>
    )
}