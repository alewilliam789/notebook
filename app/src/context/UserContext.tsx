import { ReactNode, createContext, useContext, useState } from "react";

type UserData = {
    userName : string;
}

interface UserContextProps {
    userData : UserData;
    setUserData: (userData : UserData ) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

type ProviderProps = {
    children : ReactNode
}

export const UserProvider = ({children}: ProviderProps) => {
    const [userData, setUserData] = useState<UserData>({
        userName : ""
    });

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




