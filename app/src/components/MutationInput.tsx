import { UseFormRegister } from "react-hook-form";

import { fieldTitle } from "../interfaces/universalTypes";

interface ImportProps {
    name : fieldTitle,
    register: UseFormRegister<{
        title: string;
        body: string;
    }>
}


export default function MutationInput({register, name} : ImportProps){

    return (
    <input className="content bg-yellow-200 text-center focus:outline-none" placeholder={name} {...register(name, {required: "This field is required", minLength :{value: 4, message: `This ${name.toLowerCase()} is too short`}})}/>
    )
}