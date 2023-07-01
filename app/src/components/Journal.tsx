import { useUserContext } from "../context/UserContext";
import VaraText from "./VaraText";

export default function Journal(){

    const {user} = useUserContext()


    return  (
        <div className="bg-navy w-[700px] h-[600px] mx-auto flex flex-column justify-center rounded-xl journal">
            <div className="h-32 w-64 p-6 mt-32 flex justify-center bg-white">
                <div className="self-center">
                    <VaraText text={`Hello ${user}`} />
                </div>
            </div>
        </div>
    )
}