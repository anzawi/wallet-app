import {observer} from "mobx-react-lite";
import {useStore} from "../../../../app/stores/store";
import {useEffect} from "react";

function ListTransactions() {
    const {transactionStore} = useStore();
    const {tabs, setTab} = transactionStore;

    useEffect(() => {
        transactionStore.getAllTransaction()
    }, [transactionStore])

    return (
        <>
            <div className="flex flex-col mt-8 ml-5 w-full px-3.5 overflow-hidden">
                <div className="inline-flex rounded-md mb-5 mt-5" role="group">
                    <button type="button"
                            name={'all'}
                            onClick={(event) => setTab(event.currentTarget.name)}
                            className={`rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700${tabs.get("all") ? ' z-10 ring-2 ring-blue-700 text-blue-700' : ''}`}>
                        All
                    </button>
                    <button type="button"
                            name={'pending'}
                            onClick={(event) => setTab(event.currentTarget.name)}
                            className={`border-t border-b border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700${tabs.get("pending") ? ' z-10 ring-2 ring-blue-700 text-blue-700' : ''}`}>
                        Pending
                    </button>
                    <button type="button"
                            name={'approved'}
                            onClick={(event) => setTab(event.currentTarget.name)}
                            className={`border-t border-l border-b border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700${tabs.get("approved") ? ' z-10 ring-2 ring-blue-700 text-blue-700' : ''}`}>
                        Approved
                    </button>
                    <button type="button"
                            name={'declined'}
                            onClick={(event) => setTab(event.currentTarget.name)}
                            className={`rounded-r-md border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700${tabs.get("declined") ? ' z-10 ring-2 ring-blue-700 text-blue-700' : ''}`}>
                        Declined
                    </button>
                </div>

                <div className="-my-2 py-2 overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="flex flex-col w-full">
                        <div className="-my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                User
                                            </th>
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
                                            <th scope="col" className="relative px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {transactionStore.current.map((transaction) => (
                                            <tr key={transaction.uuid}
                                                className={`${tabs.get('all') ? transaction.status === 'pending' ? 'bg-yellow-100' : transaction.status === 'approved' ? 'bg-green-100' : 'bg-red-100' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.user}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.type}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {transaction.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {transaction.status}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="inline-flex rounded-md" role="group">
                                                        {transaction.status !== 'approved' ?
                                                            <button onClick={() => transactionStore.change(transaction.uuid, 'approved')}
                                                               className="ml-3 text-green-600 hover:text-green-900 cursor-pointer">
                                                                Approve
                                                            </button> : null}
                                                        {transaction.status !== 'declined' ?
                                                            <button onClick={() => transactionStore.change(transaction.uuid, 'declined')}
                                                               className="ml-3 text-red-600 hover:text-red-900 cursor-pointer">
                                                                Decline
                                                            </button> : null}
                                                        {transaction.status !== 'pending' ?
                                                            <button onClick={() => transactionStore.change(transaction.uuid, 'pending')}
                                                               className="ml-3 text-yellow-600 hover:text-yellow-900 cursor-pointer">
                                                                Pending
                                                            </button> : null}
                                                    </div>
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

export default observer(ListTransactions);
