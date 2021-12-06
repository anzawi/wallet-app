import {Popover} from '@headlessui/react'
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import {Link} from "react-router-dom";

function Nav() {
    const {userStore} = useStore();
    const {isLoggedin} = userStore;
    return (
        <Popover className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to={'/'}>
                            <span className="sr-only">Workflow</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                alt="Wallet-App Logo"
                            />
                        </Link>
                    </div>
                    <Popover.Group as="nav" className="md:flex space-x-10">
                        {isLoggedin ?
                            userStore.isAdmin ?
                                <Link to={"/dashboard"} className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Dashboard
                                </Link>
                                :
                                <Link to={"/profile"} className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Profile
                                </Link>
                           : null}
                    </Popover.Group>
                    <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                        {!isLoggedin ?
                            <>
                                <Link to={"/"} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                    Sign in
                                </Link>
                                <Link
                                    to={"/register"}
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Sign up
                                </Link>
                            </> :
                            <button onClick={() => userStore.logout()} className="cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900">
                                Logout
                            </button>
                        }
                    </div>
                </div>
            </div>
        </Popover>
    )
}

export default observer(Nav);