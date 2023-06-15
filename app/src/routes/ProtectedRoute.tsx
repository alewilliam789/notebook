import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';






export default function  ProtectedRoute({ children }: { children: JSX.Element }){

    const {user} = useUserContext()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!user){
           navigate('/')
    }
},[])

   return children

};