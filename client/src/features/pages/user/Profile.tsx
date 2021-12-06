import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import CreateTransaction from "./CreateTransaction";

function Profile() {
    const {userStore, transactionStore, modalStore} = useStore()
    const {totals} = transactionStore
    const {wallet} = userStore
    const {openModal} = modalStore

    useEffect(() => {
        transactionStore.totalsByUser()
        userStore.getUserWallet()
    }, [transactionStore, userStore])

    return (
        <div className="bg-gray-500">
            <div className="items-center flex flex-wrap flex-col shadow-xl bg-white p-10">
                <header className=" text-2xl font-extrabold py-4 px-4 text-center">
                    {userStore.user?.name}
                </header>
                <div>
                    <ul className="text-gray-500 text-center font-semibold">
                        <li>Total Transaction : {transactionStore.totalTransaction}</li>
                        <li>Approved : {totals?.approved}</li>
                        <li>Declined : {totals?.declined}</li>
                        <li>Pending  : {totals?.pending}</li>
                    </ul>
                </div>
                <div className="bg-white mt-5 w-1/2 text-black text-center max-w-md flex flex-col rounded-xl shadow-lg p-4">
                    <div className="border-b py-2">
                        <div className="flex items-center justify-between space-x-4 text-center">
                            <div className="text-md font-bold">Total Balance</div>
                            <div className={"text-gray-500 font-bold font-medium"}> $ {wallet?.balance}</div>
                        </div>
                    </div>
                    <div className="border-b py-2">
                        <div className="flex items-center justify-between space-x-4 text-center">
                            <div className="text-md font-bold">Deposit</div>
                            <div className={"text-gray-500 font-bold font-medium"}> $ {wallet?.deposit}</div>
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="flex items-center justify-between space-x-4 text-center">
                            <div className="text-md font-bold">Withdraw</div>
                            <div className={"text-gray-500 font-bold font-medium"}> $ {wallet?.withdraw}</div>
                        </div>
                    </div>
                </div>
                <footer className="text-center py-3 px-8 text-gray-500 flex justify-between w-full">
                    <button
                        onClick={() => openModal(<CreateTransaction />)}
                        className="py-2 px-4 mt-5 bg-indigo-500 rounded-lg text-white font-semibold hover:bg-indigo-600"
                    >
                        New transaction
                    </button>

                    <Link to={'/profile/history'}
                        className="py-2 px-4 mt-5 bg-red-500 rounded-lg text-white font-semibold hover:bg-red-600"
                    >
                        Transactions history
                    </Link>
                </footer>
            </div>
        </div>
    )
}

export default observer(Profile);