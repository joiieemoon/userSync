export interface conversation {
    id?: string,
    type: "private" | "group",
    participants: string[],
    lastMessage: string,
    lastMessageAt: string,
    createdAt: string,
    createdBy: string

}

export interface message{
    messageid:string,
    senderId:string,
    text:string,
    createdAt:string,
    seenBy:string[],
}