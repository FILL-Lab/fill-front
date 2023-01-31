export interface ITEM { 
    label: string;
    key: string;
    link?:string
}

export interface userState {
    public_key: string; 
    id:string |number,
    account?: number,
    [key:string]:any
}


export interface walletState { 
    show: boolean;
    wallet?: string;
    result?:any
}
export interface rootState { 
    user: userState
    wallet:walletState
}