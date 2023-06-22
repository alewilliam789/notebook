import {ReactNode, createContext, useContext, useEffect, useReducer} from "react";

import mutationReducer  from '../reducers/mutationReducer';
import { MutationAction } from '../reducers/mutationReducer';



interface MutationContextProps {

    state : FormBooleans
    dispatch : React.Dispatch<MutationAction>

}

export interface FormBooleans {
    edit : boolean,
    delete: boolean,
    add : boolean
}


export const MutationContext = createContext<MutationContextProps | null>(null);

type ProviderProps = {
    children : ReactNode,
    isAdd : boolean
    setIsAdd : React.Dispatch<React.SetStateAction<boolean>> 
}


export const MutationProvider = ({children, isAdd, setIsAdd}: ProviderProps) => {

    const [state, dispatch] = useReducer(mutationReducer, {"edit" :false, "delete": false,"add":isAdd});

    useEffect(()=>{
        if(isAdd != state.add){
            setIsAdd(()=>{
                return state.add
            })
        }
    },[isAdd, state.add])




    return <MutationContext.Provider value={{state,dispatch}}>{children}
        </MutationContext.Provider>
};

export const useMutationContext = () => {
    const mutationContext = useContext(MutationContext);

    if(!mutationContext){
        throw new Error("This hook needs to be used inside a MutationProvider")
    }

    return mutationContext
}