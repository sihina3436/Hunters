import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi'
import UpdateUserRole from './UpdateUserRole';


const ManageUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] =useState(null);
    const { data: users = [], error, isLoading, refetch } = useGetUserQuery();
      console.log(users)
    
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (id) =>{
        try {
            const responce = await deleteUser(id).unwrap();
            alert("User deleted successfully");
            await refetch(); // Refetch users after deletion
        } catch (error) {
            console.error("Error deleting user:", error);   
            alert("Failed to delete user. Please try again.");
            
        }
    }

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);   
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); 
        setSelectedUser(null);
    }
  return (
       <>
            {
                isLoading && <div>Loading...</div>

            }
            {
                error && <div>Error loading users data.</div>
            }
            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Users</h3>
                                </div>
                               
                            </div>

                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            User email
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            User role
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit or manage
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        users && users.map((user, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {user?.email || 'N/A'}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    <span
                                                        className={`rounded-lg  py-[2px] px-3 ${user?.role === "admin"
                                                                ? "bg-primary text-white "
                                                                : "bg-primary-light text-primary"
                                                            }`}
                                                    >
                                                        {" "}
                                                        {user?.role}
                                                    </span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer hover:text-primary">
                                                    <button
                                                       type="button"
                                                       onClick={() => handleEdit(user)}
                                                       className="inline-flex items-center gap-2 rounded-lg border border-primary bg-white px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                                      <i className="ri-edit-2-line text-base"></i>
                                                      Edit
                                                    </button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                      type="button"
                                                      onClick={() => handleDelete(user?._id)}
                                                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-red-500">
                                                      <i className="ri-delete-bin-6-line text-base"></i>
                                                      Delete
                                                     </button>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>



                <footer className="relative pt-8 pb-6 mt-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                               <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made with ZeroZCloths.
                               </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
           

            {
                isModalOpen &&  <UpdateUserRole user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch}/>
            }
        </>
  )
}

export default ManageUsers
