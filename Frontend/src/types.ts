export interface userInterface{
    _id?:string,
    username:string,
    password:string,
    email:string,
    firstName:string,
    lastName:string,
    image:string,
    teams:[team]
    status:string
}

export interface messages{
    _id?:string,
    sender:string,
    team_id:string,
    channel_id:string,
    message:string,
    file:{
        type:string,
        link:string,
        name:string
    },
    time:Date,
    image:string,
}

export interface channel{
    _id?:string,
    name:string,
    team_id:string,
    logo:string,
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