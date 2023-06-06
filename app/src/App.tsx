import Sidebar from "./components/Sidebar";
import Notepad from "./components/Notepad";



export default function App(): React.JSX.Element {


  return (
    <>
    <section className="flex gap-10">
      <nav>
        <Sidebar />
      </nav>
      <main>
        <Notepad />
      </main>
    </section>
    </>
  )
}