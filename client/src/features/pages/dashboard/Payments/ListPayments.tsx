import {observer} from "mobx-react-lite";
import {useStore} from "../../../../app/stores/store";
import React, {useEffect} from "react";
import ManagePayment from "./ManagePayment";

function ListPayments() {
    const {paymentStore, modalStore} = useStore();
    const {payments} = paymentStore

    useEffect(() => {
        paymentStore.getAll();
    }, [paymentStore])

    return (
        <>
            <div className="flex flex-col mt-8 ml-16">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <button onClick={() => modalStore.openModal(<ManagePayment />)}
                               className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Create new
                            </button>
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
                                                Currencies
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Withdrawal
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Deposit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {payments.map((payment) => (
                                            <tr key={payment.slug}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div
                                                                className="text-sm font-medium text-gray-900">{payment.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap flex flex-wrap">
                                                    {JSON.parse(payment.currencies).map((currency: string) => (
                                                        <span key={currency}
                                                        className="px-2 w-1/4 inline-flex mt-1 text-xs ml-1 leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {currency}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="text-sm text-gray-900">MAX: {payment.withdrawal.max}</div>
                                                    <div className="text-sm text-gray-900">MIN: {payment.withdrawal.min}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="text-sm text-gray-900">MAX: {payment.deposit.max}</div>
                                                    <div className="text-sm text-gray-900">MIN: {payment.deposit.min}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={payment.img}
                                                             alt=""/>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => modalStore.openModal(<ManagePayment
                                                            payment={{
                                                                name: payment.name,
                                                                img: payment.img,
                                                                min_withdrawal: `${payment.withdrawal.min}`,
                                                                max_withdrawal: `${payment.withdrawal.max}`,
                                                                min_deposit: `${payment.deposit.min}`,
                                                                max_deposit: `${payment.deposit.max}`,
                                                                currencies: payment.currencies,
                                                                slug: payment.slug
                                                            }}
                                                        />)}
                                                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => paymentStore.delete(payment.slug)}
                                                        className="text-indigo-600 hover:text-indigo-900 ml-5 cursor-pointer">
                                                        Delete
                                                    </button>
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

export default observer(ListPayments);
