  import useUsers from "../../../../hooks/useUser/useUsers";
  import { MdDeleteForever } from "react-icons/md";
  import DeleteUser from "../../../../modals/deleteUser/DeleteUser";
  import { useState } from "react";
  import { FaRegEdit } from "react-icons/fa";
  import EditUser from "../../../../modals/edituserModal/EditUser";
  import { FaSortAlphaDown,FaSortAlphaDownAlt  } from "react-icons/fa";
  // import { useState}  from "react";
  import { auth } from "../../../../components/firebase/firebase";
  export default function UsersDetails() {
    const { users, loading } = useUsers();
    const [userToDelete, setUserToDelete] = useState(null); 
    const [userToEdit, setUserToEdit] = useState(null); 
    
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    if (loading) return <div className="p-6">Loading...</div>;


    const currentUid = auth.currentUser?.uid;

    const currentUser=users.find(u=>u.uid===currentUid);
    const isAdmin=currentUser?.role==="admin";

    const exculdeCurrentUser=users.filter(u=>u.uid!==currentUid)
    const SortedUser= [...exculdeCurrentUser].sort((a,b)=>{
      const nameA=a.firstName.toLowerCase();
      const nameB=b.firstName.toLowerCase();
      if(sortOrder==="asc") return nameA.localeCompare(nameB);

      return nameB.localeCompare(nameA);
    })

    const toggleSortOrder = () => {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };
    return (
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-6 dark:text-white ">All Users</h2>

        <table className="w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left flex cursor-pointer  items-center group" onClick={toggleSortOrder}> First Name {sortOrder === "asc" ?   <FaSortAlphaDown className="text-xl ml-1 hidden group-hover:block" /> : <FaSortAlphaDownAlt className="text-xl ml-1" />}</th>
            
              
              <th className="p-3 text-left">Email</th>
              
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Created At</th>
              {/* <th className="p-3 text-left">Action</th> */}
              {isAdmin && <th className="p-3 text-left">Action</th>}
              
            </tr>
          </thead>

          <tbody>
            {SortedUser.map((u) => (
              <tr key={u.uid} className="border-t">
                <td className="p-3">{u.firstName} </td>
              
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone || "-"}</td>
                <td className="p-3">{u.role || "-"}</td>
                <td className="p-3">{u.createdAt}</td>
               {isAdmin &&( <td className="p-3 flex flex-row">
                  <button
                    type="button"
                    className={!isAdmin ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    // className=" cursor-pointer p-2 rounded-xl flex justify-center items-center gap-2"
                    onClick={() => setUserToDelete(u)} // Set the user to delete
                  >
                    <MdDeleteForever  className="text-red-500 text-2xl"/>
                  
                  
                  </button>

                  <button
                    type="button"
                    className=" cursor-pointer p-2 rounded-xl flex justify-center items-center gap-2"
                    onClick={() => setUserToEdit(u)} // Set the user to delete
                  >
                    <FaRegEdit  className="text-blue-400 text-2xl"/>
                  
                  
                  </button>
                </td>)}
              </tr>
            ))}
          </tbody>
        </table>

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
