import Sidebar from "./components/Sidebar";
import Notepad from "./components/Notepad";
import LogoutButton from "./components/LogoutButton";


export default function App(): React.JSX.Element {


  return (
    <>
    <section className="flex gap-10 bg-gradient-to- from-sky-500">
      <nav>
        <Sidebar />
      </nav>
      <main>
        <LogoutButton />
        <Notepad />
      </main>
    </section>
    </>
  )
}