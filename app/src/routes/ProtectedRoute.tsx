import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';

import { useUserContext } from "../context/UserContext";






export default function  ProtectedRoute({ children }: { children: JSX.Element }){

    const {user} = useUserContext()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!user){
           navigate('/')
    }
},[user])

   return children

};