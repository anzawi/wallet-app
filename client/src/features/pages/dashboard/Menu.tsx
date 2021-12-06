import {observer} from "mobx-react-lite";
import { Link } from "react-router-dom";
import {useStore} from "../../../app/stores/store";

function Menu() {
    const {userStore} = useStore();
    return (
        <>
            <div
                className="fixed h-full z-30 inset-y-0 left-0 w-64 bg-gray-900 overflow-y-auto">
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <span className="text-white text-2xl mx-2 font-semibold">Dashboard</span>
                    </div>
                </div>

                <nav className="mt-10">
                    <Link to={'/dashboard'}
                          className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                          children={<span className="mx-3">Dashboard</span>}
                    />
                    <Link to={'/dashboard/payments'}
                          className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                          children={<span className="mx-3">Payments</span>}
                    />

                    <Link to={'/dashboard/users'}
                          className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                          children={<span className="mx-3">Users</span>}
                    />

                    <Link to={'/dashboard/transaction'}
                          className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                          children={<span className="mx-3">Transactions</span>}
                    />

                    <button className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 cursor-pointer"
                       onClick={() => userStore.logout()}>
                        <span className="mx-3">Logout</span>
                    </button>
                </nav>
            </div>
        </>
    );
}

export default observer(Menu);
