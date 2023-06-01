import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Signup(){

    const navigate = useNavigate();

    const {setUserData} = useUserContext();

    const [doesExist, setDoesExist] = useState(false);

    const {register, handleSubmit, getValues, formState: {errors}} = useForm(
        {defaultValues: {
            userName : "",
            password : "",
            confirmPassword: ""
        }}
    );


    function handleUserVerification() : string | undefined{
        
        if(doesExist){
            return "This username already exists"
        }
        return (errors.confirmPassword?.message?.toString())
    }




    type FormValues = {
        userName : string;
        password : string;
        confirmPassword : string;
    }


    async function validatePassword(value : string){
        const password = getValues("password");

        if(!(value == password)){
            return 'Passwords need to match'
        }
    }


    async function onSubmit(data: FormValues) {

            let response = await fetch('https://tayjournal-api.herokuapp.com/users/register',
                        {
                            method: "POST",
                            headers: {'Content-Type':'application/json'},
                            body: JSON.stringify({
                                userName : data.userName,
                                password : data.password
                            }),
                        }
                        )
            if(response.status == 409){
               setDoesExist(true)
            }
            else if(response.status == 500){

            }
            else{
                setUserData({
                   userName: data.userName 
                })
                navigate("/notebook")
            }
        }

    return (
    <>
    <div className="w-80  mx-auto mt-20 border border-gray-800 rounded-lg">
    
    <form id="user" className="p-10 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-10 text-center text-2xl"> Sign up for the Notebook</label>
            <input className="border-b-2 border-gray-300 font-mono focus:outline-none" placeholder="Username" {...register("userName", {required: "This field is required"})}/>
            <p className="text-red-600 italic font-thin text-sm">{errors.userName?.message?.toString()}</p>
            
            <input className="border-b-2 border-gray-300 font-mono focus:outline-none" placeholder="Password" type="password" {...register("password", {required: "This field is required"})} />
            <p className="text-red-600 italic font-thin text-sm">{errors.password?.message?.toString()}</p>

            <input className="border-b-2 border-gray-300 font-mono focus:outline-none" placeholder="Confirm Password" type="password" {...register("confirmPassword", {required: "This field is required", validate : validatePassword})} />
            <p className="text-red-600 italic font-thin text-sm">{handleUserVerification()}</p>
            <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
            <Link className="text-sm text-center" to={"/login"}>Already have an account? Login</Link>
    </form>
    </div>
    </>
    )
}