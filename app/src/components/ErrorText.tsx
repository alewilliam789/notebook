
interface ErrorTextProps {
    errorMessage : string | undefined
}



export default function ErrorText({errorMessage} : ErrorTextProps){

    return(
        <p className="text-red-600 italic font-thin text-sm">{errorMessage ? errorMessage : null}</p>
    )
}