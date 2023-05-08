import { Link } from "react-router-dom"

export default function Sidebar(): React.JSX.Element{

    const listNumbers: number[] = [...Array.from(Array(10).keys())]

    const liList = listNumbers.map((num:number) =>{
        return <Link to={`/notes/${num+1}`}><li> Note {num+1}</li></Link>
    })
    return (
        <div className="">
            <ol>
                {liList}
            </ol>
        </div>
    )
}