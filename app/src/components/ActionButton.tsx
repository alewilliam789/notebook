

interface ActionButtonProps {
    icon : string | JSX.Element,
    handleClick : (()=> void) | null,
    action? : string
    
} 



export default function ActionButton({icon, handleClick, action} : ActionButtonProps){


    if(handleClick){
        return (
            <button title={action} className={"w-16 h-16 bg-white flex justify-center border rounded-full button-shadow"} onClick={handleClick}>{icon}</button>
        )
    
    }

    return (
        <button className={"w-16 h-16 bg-white flex justify-center border rounded-full"}>{icon}</button>
    )

}