import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";



export default function Root(): React.JSX.Element {

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