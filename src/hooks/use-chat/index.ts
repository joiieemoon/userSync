import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../services/firebase/firebase.ts";
import type { RootState } from "../../redux/store/store";
import type { Chat } from "../../types/interfaces/index.ts";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slice/uiSlice";
const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const dispatch = useDispatch();

  const currentUid = auth.currentUser?.uid;
  const { loading } = useSelector((state: RootState) => state.ui.users);
  useEffect(() => {
    if (!currentUid) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUid),
      orderBy("lastMessageAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedChats: Chat[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Chat),
        createdBy: (doc.data() as any).createdBy || null,
      }));
      setChats(fetchedChats);
  
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [currentUid]);

  const existingChatUserIds = chats.flatMap((chat) =>
    chat.participants.filter((p) => p !== currentUid),
  );

  const getLastMessage = (uid: string) => {
    const chat = chats.find((c) => c.participants.includes(uid));
    return chat?.lastMessage || null;
  };

  const getCreatedBy = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId);
    return chat?.createdBy || null;
  };

  return {
    chats,
    loading,
    existingChatUserIds,
    getLastMessage,
    currentUid,
    getCreatedBy,
  };
};

export default useChats;
