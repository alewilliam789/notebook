import {ReactNode, createContext, useContext, useState} from "react";


interface UserContextProps {

    user: string;

}


export const UserContext = createContext<UserContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}


export const UserProvider = ({children}: ProviderProps) => {


    const [user] = useState(localStorage.getItem('user')?.replace(/["]+/g,"") || "");



    return <UserContext.Provider value={{user}}>{children}
        </UserContext.Provider>
};

export const useUserContext = () => {
    const userContext = useContext(UserContext);

    if(!userContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return userContext
}