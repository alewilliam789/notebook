


export default function Note(): React.JSX.Element {
    
    const note = {
        title: "First Entry",
        body: "This is the first entry in the journal"
    }

return (
    <>
    <div>
        {note.title}
    </div>
    <div>
        {note.body}
    </div>
    </>
)

}