import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useEffect} from "react";

function ProfileHistory() {
    const {userStore} = useStore()
    const {transactions} = userStore

    useEffect(() => {
        userStore.getUserTransaction()
    }, [userStore])
    return (
        <div className="bg-gray-500">
            <div className="shadow-xl bg-white p-10">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Amount
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                        <tr key={transaction.uuid}
                            className={`${transaction.status === 'pending' ? 'bg-yellow-100' : transaction.status === 'approved' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {transaction.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {transaction.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {transaction.status}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default observer(ProfileHistory);