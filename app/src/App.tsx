import { useNavigate } from "react-router-dom";

import ActionButton from "./components/ActionButton";
import Journal from "./components/Journal"

import logoutLogo from './assets/icons/logout.png';


export default function App(): React.JSX.Element {

  const navigate = useNavigate()


  return (
    <>
      <main className="py-12 px-5 w-full h-[2000px] bg-day flex flex-col align-center gap-6 overflow-auto">
          <ActionButton action="Logout" handleClick={()=>{
            localStorage.clear()
            navigate('/')
          }} icon={logoutLogo} position="place-items-end"/>
          <Journal />
      </main>
    </>
  )
}