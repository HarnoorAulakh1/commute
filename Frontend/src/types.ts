export interface userInterface{
    _id?:string,
    username:string,
    password:string,
    email:string,
    firstName:string,
    lastName:string,
    image:string,
    teams:string[],
    channels:string[],
    status:string
    darkMode:boolean,
}

export interface messages{
    _id?:string,
    name:string,
    sender_id:string,
    team_id:string,
    channel_id:string,
    message:string,
    file:{
        type:string,
        link:string,
        name:string
    },
    created_at?:Date,
    image:string,
}

export interface channel{
    _id?:string,
    name:string,
    team_id:string,
    logo:string,
    description:string,
    members:[userInterface]
    messages:[messages]
}

export interface team{
    _id?:string,
    name:string,
    logo:string,
    channels:[channel],
    admins:[userInterface],
    members:[userInterface],
    saved:[{
        type:string,
        link:string,
        name:string
    }],
    description:string,
    created_at:Date
}

export interface message{
    _id?:string,
    name:string,
    sender_id:string,
    team_id:string,
    channel_id:string,
    message:string,
    file:{
        type:string,
        link:string,
        name:string
    },
    time:string,
    image:string,
}