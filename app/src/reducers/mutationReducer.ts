import { FormBooleans } from "../context/MutationContext";

export type MutationType = "add" | "edit" | "delete" | "logout" | "all";


export interface MutationAction{

    type: MutationType,
}


export default function mutationReducer(state: FormBooleans, action : MutationAction ){

    const {type } = action;

    if(type == 'add'){
        return {
            ...state,
            "add": !state.add
        }
    }
    else if(type == 'edit'){
        return {
            ...state,
            "edit" : !state.edit
        }
    }
    else if(type == 'all'){
        return{
            ...state,
            "edit" : false,
            "add" : false,
            "delete": false
        }
    }
    else{
        return {
            ...state,
            "delete" : !state.delete
        }     
    }
}