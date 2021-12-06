import {observer} from "mobx-react-lite";
import {useStore} from "../../../../app/stores/store";
import {useEffect} from "react";

function ListUsers() {
    const {userStore} = useStore();
    const {allUsers, user} = userStore

    useEffect(() => {
        userStore.listUsers()
    }, [userStore])

    return (
        <>
            <div className="flex flex-col mt-8 ml-16">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <a href="/"
                               className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Create new</a>
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Is admin
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {allUsers.map((usr) => (
                                            <tr key={usr.email} className={`${usr.email === user?.email ? 'bg-gray-500 text-white' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {usr.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {usr.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                  <span
                                                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${!usr.blocked ? 'bg-green-100 text-green-800': 'bg-red-100 text-red-800'}`}>
                                                    {!usr.blocked ? 'Active' : 'Blocked'}
                                                  </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {usr.email !== user?.email ?
                                                        !usr.blocked ? (
                                                            <button onClick={() => userStore.blockUnblock(usr.email)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                                Block
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => userStore.blockUnblock(usr.email)} className="text-red-600 hover:text-red-900 cursor-pointer">
                                                                Unblock
                                                            </button>
                                                        )
                                                        : null
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(ListUsers);
