import { useState, useEffect } from "react";
import { socket, chatsocket } from "../../services/socket";

export const useChatSocket = (userId: string) => {
  const [onlineuserCount, setonlineuserCount] = useState(0);
 

  useEffect(() => {
    const onChatConnect = () => {
    

      chatsocket.emit("chat-active", { currentUid: userId });
    };

    const onOnlineCount = (count) => {
      setonlineuserCount(count);
    };

    chatsocket.connect();
    chatsocket.on("connect", onChatConnect);
    chatsocket.on("activeCount", onOnlineCount);

    return () => {
      chatsocket.emit("chat-inactive", { currentUid: userId }); 

      chatsocket.off("connect", onChatConnect);
      chatsocket.off("activeCount", onOnlineCount);
    };
  }, [userId]);

  return {
    onlineuserCount,
    
  };
};
