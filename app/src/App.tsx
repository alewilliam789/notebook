import { useNavigate } from "react-router-dom";

import ActionButton from "./components/ActionButton";
import NoteList from "./components/NoteList";

import logoutLogo from './assets/icons/logout.png';


export default function App(): React.JSX.Element {

  const navigate = useNavigate()


  return (
    <>
    <section className="flex gap-10">
      <main className="w-screen h-screen bg-day flex flex-col gap-6">
        <div className="m-6 self-end">
          <ActionButton action="Logout" handleClick={()=>{
            localStorage.clear()
            navigate('/')
          }} icon={<img className="self-center" src={logoutLogo} alt="Logout" />} />
        </div>
        <div className="px-24 w-screen self-center overflow-auto scrollbar-hide">
          <NoteList />
        </div>
      </main>
    </section>
    </>
  )
}