export interface ITEM { 
    label: string;
    key: string;
    link?: string
    width?: string
    render?:Function
}

export interface userState {
    public_key: string; 
    id:string |number,
    account?: number,
    [key:string]:any
}


export interface contractState {
    account?: number | string,
    FIL: number | string,
    FLE: number | string,
    loading: boolean,
    minerList: Record<string, any>,
    borrowList:Array<any>

}

export interface creditState { 
    show:boolean
}

export interface walletState { 
    show: boolean;
    wallet?: string;
    result?:any
}
export interface rootState {
    contract: contractState; 
    user: userState
    wallet: walletState
    credit:creditState
}