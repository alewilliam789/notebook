import { useEffect } from "react";
import {useForm} from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login(){


    const {register, handleSubmit, formState: {errors}} = useForm(
        {defaultValues: {
            userName : "",
            password : ""
        }}
    );

    type FormValues = {
        userName : string;
        password : string;
    }

    const onSubmit= (data : FormValues) => {console.log(data)};

    return (
    <>
    <div className="w-80  mx-auto mt-20 border border-gray-800 rounded-lg">
    <form id="user" className="p-10 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-10 self-center text-2xl"> Welcome</label>
            <input className="border-b-2 border-gray-300 font-mono focus:outline-none" placeholder="Username" {...register("userName", {required: "This field is required"})}/>
            <p className="text-red-600 italic font-thin text-sm">{errors.userName?.message?.toString()}</p>
            
            <input className="border-b-2 border-gray-300 font-mono focus:outline-none" placeholder="Password" {...register("password", {required: "This field is required"})} />
            <p className="text-red-600 italic font-thin text-sm">{errors.password?.message?.toString()}</p>
            <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
            <Link className="text-sm text-center" to={"/signup"}>Don't have an account? Sign up!</Link>
    </form>
    </div>
    </>
    )
}