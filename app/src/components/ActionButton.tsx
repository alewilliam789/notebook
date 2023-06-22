

interface ActionButtonProps {
    icon : string | JSX.Element,
    handleClick : ()=> void,
    
} 



export default function ActionButton({icon, handleClick} : ActionButtonProps){


    return (
        <button className={"w-16 h-16 bg-white flex justify-center border rounded-full"} onClick={() => handleClick()}>{icon}</button>
    )


}