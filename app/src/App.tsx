import ActionButton from "./components/ActionButton";
import NoteList from "./components/NoteList";


export default function App(): React.JSX.Element {


  return (
    <>
    <section className="flex gap-10">
      <main className="w-screen h-screen bg-gray-800 flex flex-col gap-6">
        <div className="self-end bg-white">
          <ActionButton action={"logout"} icon={"Logout"} />
        </div>
        <div className="px-64 w-screen self-center overflow-auto">
          <NoteList />
        </div>
      </main>
    </section>
    </>
  )
}