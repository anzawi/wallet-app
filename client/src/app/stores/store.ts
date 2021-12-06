/**
 * Stores Container
 */

import {createContext, useContext} from "react";
import ErrorsStore from "./ErrorsStore";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import PaymentStore from "./PaymentStore";
import ModalStore from "./ModalStore";
import TransactionStore from "./TransactionStore";

interface Store {
    errorsStore: ErrorsStore
    userStore: UserStore
    commonStore: CommonStore
    paymentStore: PaymentStore
    modalStore: ModalStore
    transactionStore: TransactionStore
}

export const store: Store = {
    userStore: new UserStore(),
    errorsStore: new ErrorsStore(),
    commonStore: new CommonStore(),
    paymentStore: new PaymentStore(),
    modalStore: new ModalStore(),
    transactionStore: new TransactionStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}