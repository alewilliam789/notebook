

interface ActionButtonProps {
    icon : string | undefined,
    handleClick : (()=> void) | undefined,
    position?: string,
    transition? : string,
    action? : string
    
} 



export default function ActionButton({icon, handleClick, position, transition, action} : ActionButtonProps){



        return (
            <button title={action} className={`w-16 h-16 bg-white flex justify-center border rounded-full button-shadow ${position ? position : ""} ${transition ? transition : ""}`} onClick={handleClick}>{<img className="self-center" src={icon} alt={action} />}</button>
        )

}