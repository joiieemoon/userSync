export interface conversation {
    id?: string,
    type: "private" | "group",
    participants: string[],
    lastMessage: string,
    lastMessageAt: string,
    createdAt: string,
    createdBy: string

}
export interface Chat {
    id: string;
    participants: string[];
    type: string;
    lastMessage?: string;
    lastMessageAt?: any;
    createdBy?: string;
}
export interface message {
    messageid: string,
    senderId: string,
    text: string,
    createdAt: string,
    seenBy: string[],
}
export interface User {
    uid: string;
    firstName: string;
    lastName?: string;
    email: string;
    profilePhoto?: string;
    isGroup?: true,
}

export interface conversationProps {
    selectedUser: User | null;
    onClose: () => void;
    currentUid: string;

    onUnreadCountChange?: (chatId: string | null, count: number) => void;

}
export interface ChatSidebarProps {
    users: User[];
    loading: boolean;
    currentUid: string;
    setSelectedUser: (user: User | null) => void;
    unreadCounts?: Record<string, number>;
    chat: any,

}
export interface AddNewSpaceModalProps {
    createChat: (
        chatType: "private" | "group",
        participants: string[],
        groupName?: string,
    ) => void;
    onUserSelected?: (user: User) => void;
    addmode: "create" | "add"
}

