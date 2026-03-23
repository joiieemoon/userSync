import { Pagination } from "flowbite-react";
//authslice
export interface AuthState {
    user: User | null;
}
//navbar
export interface NavbarProps {
    toggleSidebar: () => void;
    isOpen: boolean;
}
//sidebar
export interface SidebarProps {
    isOpen: boolean;
}
//searchbar
export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
}

//pagination 

export interface PaginationMainProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    extraProps?: Partial<React.ComponentProps<typeof Pagination>>;
}
//use pagiantion hook 
export interface UsePaginationProps<T> {
    data: T[];
    itemsPerPage?: number;
    searchTerm?: string;
    sortField?: keyof T;
    sortOrder?: "asc" | "desc";
    filterFields?: (keyof T)[];
}
//formcontroller
export interface formcontrollerProps {
    control: "input" | "textarea" | "select" | "checkbox";
    [key: string]: any;
}
//profile modyul interfaces
export interface PersonalDetails {
    user: {
        uid: string;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        role?: string;
        bio?: string;
    };
    onEdit: () => void;
}
//profile header
export interface ProfileHeaderprops {
    onEdit?: () => void;
}
//updateProfile props
export interface updateProfileProps {
    user: {
        uid: string;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        role?: string;
        bio?: string;
        profilePhoto?: string;
    };
    onClose: () => void;
}
//permission silice props -2
export interface Permissions {
    [module: string]: {
        canAdd: boolean;
        canEdit: boolean;
        canDelete: boolean;
        canView: boolean;
    };
}

export interface UserPermissionsState {
    username: string;
    permissions: Permissions;
}
//editbtn 
export type EditBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    label: string;
    icon?: React.ReactNode;
    variant?: "primary" | "secondary" | "main";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};

//forgetpassword
export type forgetpasswordprops = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
};
//commanModalProps
export type CommonModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string | ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    onSubmit?: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    className?: string;
    submitDisabled?: boolean;
};
//comandeletemodal
export type DeleteItemModalProps = {
    isOpen: boolean;
    onClose: () => void;
    collectionName: string;
    item: { id: string } | null;
};
//chat modyul interfaces
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
    chats:Chat[],

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

