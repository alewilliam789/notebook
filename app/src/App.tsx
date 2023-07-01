import { useNavigate } from "react-router-dom";

import ActionButton from "./components/ActionButton";
import Journal from "./components/Journal"

import logoutLogo from './assets/icons/logout.png';


export default function App(): React.JSX.Element {

  const navigate = useNavigate()


  return (
    <>
      <main className="pb-20 w-full h-full bg-day flex flex-col align-center gap-6">
        <div className="m-6 self-end">
          <ActionButton action="Logout" handleClick={()=>{
            localStorage.clear()
            navigate('/')
          }} icon={<img className="self-center" src={logoutLogo} alt="Logout" />} />
        </div>
          <Journal />
      </main>
    </>
  )
}