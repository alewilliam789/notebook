interface NoteProps {
    id: string,
    title: string,
    body: string,
    userName: string
}


export default function Note(props:NoteProps): React.JSX.Element {


return (
    <>
    <div>
        {props.title}
    </div>
    <div>
        {props.body}
    </div>
    </>
)

}