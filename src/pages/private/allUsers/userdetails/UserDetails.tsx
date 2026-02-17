import useUsers from "../../../../hooks/useUser/useUsers";
import { MdDeleteForever } from "react-icons/md";
import DeleteUser from "../../../../modals/deleteUser/DeleteUser";
import { useState } from "react";

export default function UsersDetails() {
  const { users, loading } = useUsers();
  const [userToDelete, setUserToDelete] = useState(null); // Track user being deleted

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">All Users</h2>

      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.uid} className="border-t">
              <td className="p-3">{u.firstName} {u.lastName}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.phone || "-"}</td>
              <td className="p-3">{u.role || "-"}</td>
              <td className="p-3">
                <button
                  type="button"
                  className=" cursor-pointer p-2 rounded-xl flex justify-center items-center gap-2"
                  onClick={() => setUserToDelete(u)} // Set the user to delete
                >
                  <MdDeleteForever  className="text-red-500 text-2xl"/>
                 
                </button>
              </td>
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
    </div>
  );
}
