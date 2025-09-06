export interface VIDEO {
    id: string,
    id_thumb: string,
    id_channel: string,
    title: string
}

export interface FRIEND {
    id_sender: string,
    id_receiver: string,
    id: string,
    created_at: string,
    status: string 
}


export interface Ipage{
    ns?: number,
    title: string,
    pageid: number,
    parent?: number,
    children?: Ipage[]
}