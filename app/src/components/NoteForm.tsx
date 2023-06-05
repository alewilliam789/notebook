import { useForm } from "react-hook-form";


interface NoteProps {
    id?: string,
    title: string,
    body: string,
    userName: string
}



export default function NoteForm(props : NoteProps){

    const {register, handleSubmit, formState: {errors}} = useForm(
        {defaultValues: {
            title : "",
            body : ""
        }}
    );



    return (
        <div>
            This is the Note form.
        </div>
    )









}