import { ReactNode, createContext, useContext, useState } from "react";

type UserData = {
    username : string;
}

interface UserContextProps {
    userData : UserData | null;
    setUserData: (userData : UserData ) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}

export const UserProvider = ({children}: ProviderProps) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    return <UserContext.Provider value={{userData, setUserData}}>{children}
        </UserContext.Provider>
};

export const useUserContext = () => {
    const userContext = useContext(UserContext);

    if(!userContext){
        throw new Error("This hook needs to be used inside a UserProvider")
    }

    return userContext
}




