import Sidebar from "./components/Sidebar";
import Notepad from "./components/Notepad";
import ActionButton from "./components/ActionButton";


export default function App(): React.JSX.Element {


  return (
    <>
    <section className="flex gap-10 bg-gradient-to- from-sky-500">
      <nav>
        <Sidebar />
      </nav>
      <main className="w-full flex flex-col gap-12">
        <div className="m-6 self-end">
          <ActionButton action={"logout"} icon={"Logout"} />
        </div>
        <Notepad />
      </main>
    </section>
    </>
  )
}