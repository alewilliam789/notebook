import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import {useState} from "react";
import Login from "./components/Login";



export default function App(): React.JSX.Element {
    const [user, setUser] = useState();



  return (
    <>
    <section className="flex gap-10">
      <nav>
        <Sidebar />
      </nav>
      <main>
        <Outlet />
      </main>
    </section>
    </>
  )
}