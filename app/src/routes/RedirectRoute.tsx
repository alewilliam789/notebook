import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useUserContext } from "../context/UserContext";






export default function  RedirectRoute({ children }: { children: JSX.Element }){

    const {user} = useUserContext()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(user){
           navigate('/notebook')
    }
},[])
   return children
};