import {ReactNode, createContext, useContext, useEffect, useReducer} from "react";

import formReducer  from '../reducers/formReducer';
import { MutationAction } from '../reducers/formReducer';



interface FormContextProps {

    state : FormBooleans
    dispatch : React.Dispatch<MutationAction>

}

export interface FormBooleans {
    edit : boolean,
    delete: boolean,
    add : boolean
}


export const FormContext = createContext<FormContextProps | null>(null);

type ProviderProps = {
    children : ReactNode,
    isAdd : boolean
    setIsAdd : React.Dispatch<React.SetStateAction<boolean>> 
}


export const FormProvider = ({children, isAdd, setIsAdd}: ProviderProps) => {

    const [state, dispatch] = useReducer(formReducer, {"edit" :false, "delete": false,"add":isAdd});

    useEffect(()=>{
        if(isAdd != state.add){
            setIsAdd(()=>{
                return state.add
            })
        }
    },[isAdd, state.add])




    return <FormContext.Provider value={{state,dispatch}}>{children}
        </FormContext.Provider>
};

export const useFormContext = () => {
    const formContext = useContext(FormContext);

    if(!formContext){
        throw new Error("This hook needs to be used inside a FormProvider")
    }

    return formContext
}