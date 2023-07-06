

interface SubmitButtonProps {
    buttonText : string
}

export default function SubmitButton ({buttonText}: SubmitButtonProps){

    return (
        <input value={buttonText} className="mb-2 p-2 border rounded-xl text-white bg-red-300" type="submit" />
    )
}