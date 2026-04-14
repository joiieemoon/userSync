
import { useState, useEffect } from "react";
import { auth } from "../../services/firebase/firebase.ts";
import type { Chat } from "../../types/interfaces/index.ts";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slice/ui-slice";
import { getDocs } from "firebase/firestore";
import { chatService } from "../../services/firebase/chat-services/index.ts";

const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setChats([]);
        dispatch(setLoading(false));
        return;
      }

      try {
        const q = chatService.getChatsQuery(user.uid);
        const snapshot = await getDocs(q);

        const fetchedChats: Chat[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Chat),
        }));
        console.log(fetchedChats);
        setChats(fetchedChats);
      } catch (err) {
        console.error("fetchChats error:", err);
      } finally {
        dispatch(setLoading(false));
      }
    });

    return () => unsubscribe();
  }, []);

  const currentUid = auth.currentUser?.uid;

  const existingChatUserIds = chats.flatMap((chat) =>
    chat.participants.filter((p) => p !== currentUid)
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
    existingChatUserIds,
    getLastMessage,
    currentUid,
    getCreatedBy,
  };
};

export default useChats;