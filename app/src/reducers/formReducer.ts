import { FormBooleans } from "../context/FormContext";

export type MutationType = "add" | "edit" | "delete" | "collapsed" | "all";


export interface MutationAction{

    type: MutationType,
}


export default function formReducer(state: FormBooleans, action : MutationAction ){

    const { type } = action;

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
    else if(type == 'collapsed'){
        return {
            ...state,
            "edit" : false,
            "delete": false
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