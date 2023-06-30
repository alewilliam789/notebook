

export interface NoteData  {
    _id : string;
    title: string;
    body: string;
    userName?: string;
}

export interface FormData {
    title : string;
    body : string;
}


export type fieldTitle = 'title' | 'body';


