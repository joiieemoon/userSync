import useUsers from "../../../../hooks/useUser/useUsers";
import { MdDeleteForever } from "react-icons/md";
import DeleteUser from "../../../../modals/deleteUser/DeleteUser";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import EditUser from "../../../../modals/edituserModal/EditUser";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
// import { useState}  from "react";
import { PaginationMain } from "../../../../components/pagination/Pagination";
import { MdAdd } from "react-icons/md";

import { auth } from "../../../../components/firebase/firebase";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import EditBtn from "../../../../components/button/editbutton/Editbtn";
import NewUserForm from "../../../../components/createnewUserForm/NewUserForm";
import AddNewuserModal from "../../../../modals/addNewuserModal/AddNewuserModal";

export default function UsersDetails() {
  const { users, loading } = useUsers();
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  if (loading)
    return (
      <div className="p-6 flex justify-center items-center">Loading...</div>
    );

  const currentUid = auth.currentUser?.uid;

  const currentUser = users.find((u) => u.uid === currentUid);
  const isAdmin = currentUser?.role === "admin";

  // const exculdeCurrentUser=users.filter(u=>u.uid!==currentUid)

  const filterUser = users
    .filter((u) => u.uid !== currentUid)
    .filter((u) =>
      [u.firstName, u.email, u.phone, u.role]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  const SortedUser = [...filterUser].sort((a, b) => {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();
    if (sortOrder === "asc") return nameA.localeCompare(nameB);

    return nameB.localeCompare(nameA);
  });

  const currentUsers = SortedUser.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(SortedUser.length / usersPerPage);
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="p-6  mt-10 rounded-2xl shadow-2xl ">
      <h2 className="text-3xl mt-2 font-semibold mb-2 dark:text-white ">
        All Users
      </h2>

      <div className=" flex mt-5  justify-between items-center mb-3 "><SearchBar
        value={searchTerm}
        onchange={(e) => setsearchTerm(e.target.value)}
      />{" "}
      {/* <EditBtn onClick={() => setIsAddUserOpen(true)} /> */}
    
    
    {isAdmin && <EditBtn
  label="Add User"
  icon={<MdAdd className="text-xl" />}
  onClick={() => setIsAddUserOpen(true)}
/>}  


      <AddNewuserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
      /></div>
      
      <table className="w-full bg-white rounded-xl shadow-2xl     ">
        <thead className="bg-gray-100">
          <tr className="bg-amber-300 rounded-2xl">
            <th 
              className="p-3 text-left flex cursor-pointer  items-center group "
              onClick={toggleSortOrder}
            >
              {" "}
              First Name{" "}
              {sortOrder === "asc" ? (
                <FaSortAlphaDown className="text-xl text-gray-700 ml-1 " />
              ) : (
                <FaSortAlphaDownAlt className="text-xl ml-1 text-gray-700" />
              )}
            </th>

            <th className="p-3 text-left">Email</th>

            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Created At</th>
            {/* <th className="p-3 text-left">Action</th> */}
            {isAdmin && <th className="p-3 text-left">Action</th>}
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((u) => (
            <tr key={u.uid} className="border-t ">
              <td className="p-2">{u.firstName} </td>

              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone || "-"}</td>
              <td className="p-2">{u.role || "-"}</td>
              <td className="p-2">{u.createdAt}</td>
              {isAdmin && (
                <td className="p-2 flex flex-row">
                  <button
                    type="button"
                    // className={!isAdmin ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    // className=" cursor-pointer p-2 rounded-xl flex justify-center items-center gap-2"
                    onClick={() => setUserToDelete(u)} // Set the user to delete
                  >
                    {/* <MdDeleteForever  className="text-red-300 text-2xl"/> */}
                    <AiOutlineUserDelete className="text-red-400 text-2xl" />
                  </button>

                  <button
                    type="button"
                    className=" cursor-pointer p-2 rounded-xl flex justify-center items-center gap-2"
                    onClick={() => setUserToEdit(u)} // Set the user to delete
                  >
                    <FaRegEdit className="text-amber-300 text-2xl" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <PaginationMain
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            // console.log("page clicked:", page);
            setCurrentPage(Number(page));
          }}
        />
      )}
      {/* Render modal outside the table */}
      <DeleteUser
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        user={userToDelete}
      />
      <EditUser
        isOpen={!!userToEdit}
        onClose={() => setUserToEdit(null)}
        user={userToEdit}
      />
    </div>
  );
}
