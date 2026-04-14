import Navbar from "../../../../components/layout/navbar";

import { Sidebarmain } from "../../../../components/layout/sidebar";
import ChatModule from "../chat-module";
import useTitle from "../../../../hooks/use-title";
import { toggleSidebar } from "../../../../redux/slice/ui-slice";
import { useDispatch, useSelector } from "react-redux";
const ChatLayout = () => {
  useTitle("User Sync-Chat");
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state: any) => state.ui.users.sidebarOpen);

  const handleToggleSidebar = () => dispatch(toggleSidebar());
  return (
    <>
      <div className="flex min-h-screen bg-gray-50 ">
        {/* Sidebar */}
        <Sidebarmain isOpen={isSidebarOpen} />
        {/* Navbar */}
        <Navbar toggleSidebar={handleToggleSidebar} isOpen={isSidebarOpen} />
        {/* Main layout */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* Content */}
          <main className="p-6  mt-13  space-y-7 h-[calc(100vh-80px)]">
            <ChatModule />
          </main>
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
