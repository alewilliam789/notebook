import { useState } from "react";
import {useForm} from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";


export default function Login(){

    const navigate = useNavigate();


    const [userVerification, setUserVerification] = useState({
        isCorrectPassword: true,
        doesExist: true
    });

    const {register, handleSubmit, formState: {errors}} = useForm(
        {defaultValues: {
            userName : "",
            password : ""
        }}
    );

        function handleUserVerification() : string | undefined{
            if(!userVerification.isCorrectPassword){
                return "Sorry that is an incorrect password"
            }
            else if(!userVerification.doesExist){
                return "Sorry we could not find this user"
            }

            return (errors.password?.message?.toString())
        }




    type FormValues = {
        userName : string;
        password : string;
    }


    async function onSubmit(data: FormValues) {
            let response = await fetch('https://tayjournal-api.herokuapp.com/users/login',
                        {
                            method: "POST",
                            headers: {'Content-Type':'application/json'},
                            body: JSON.stringify(data),
                        }
                        )
            if(response.status == 401){
                setUserVerification({
                    ...userVerification,
                    isCorrectPassword : false
                })
            }
            else if(response.status == 404){
                setUserVerification({
                    ...userVerification,
                    isCorrectPassword : true,
                    doesExist : false
                })
            }
            else{
               localStorage.setItem('user', JSON.stringify(data.userName))
                navigate("/notebook")
            }
        }

    return (
    <>
    <div className="w-80  mx-auto mt-20 border border-gray-800 rounded-lg">
    <form id="user" className="p-10 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-10 text-center text-2xl"> Welcome</label>
            <input className="border-b-2 border-gray-300 font-mono focus:outline-none" placeholder="Username" {...register("userName", {required: "This field is required"})}/>
            <p className="text-red-600 italic font-thin text-sm">{errors.userName?.message?.toString()}</p>
            
            <input className="border-b-2 border-gray-300 font-mono focus:outline-none" placeholder="Password" type="password" {...register("password", {required: "This field is required"})} />
            <p className="text-red-600 italic font-thin text-sm">{handleUserVerification()}</p>
            <input className="mb-2 p-2 border rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-500" type="submit"/>
            <Link className="text-sm text-center" to={"/signup"}>Don't have an account? Sign up!</Link>
    </form>
    </div>
    </>
    )
}