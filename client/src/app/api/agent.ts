/**
 * Manage all api request from client to server
 */

import axios, {AxiosError, AxiosResponse} from "axios";
import {RegisterFormValues, User, UserFormValues} from "../models/User";
import {store} from "../stores/store";
import {Payment, PaymentFormValue} from "../models/Payment";
import Transaction, {TransactionFormValues, TransactionTotal} from "../models/Transaction";
import {Wallet} from "../models/Wallet";

// set default api url
axios.defaults.baseURL = 'https://wallet-api.test/api'

// change request configuration
axios.interceptors.request.use(config => {
    store.errorsStore.reset() // reset errors
    config.headers = {
        Accept : 'application/json'
    }

    /**
     * get token
     * if token is set then send it as Bearer Auth with header
     */
    const token = store.commonStore.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

/**
 * change response behavior
 */
axios.interceptors.response.use(async response => {
    store.errorsStore.reset()
   return response;
}, (errors: AxiosError) => {
    store.errorsStore.setErrors({
        code: errors.response?.status,
        message: errors.response?.data
    })
});


const responseBody = <T>(response: AxiosResponse<T>) => response.data


const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post <T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put <T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch <T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete <T>(url).then(responseBody),
}

// user endpoints
const Users = {
    current: () => requests.get<User>('/usr/me'),
    login: (user: UserFormValues) => requests.post<User>('/login', user),
    logout: () => requests.post<string>('/logout', {}),
    register: (user: RegisterFormValues) => requests.post<User>('/register', user),
    list: () => requests.get<User[]>('/usr'),
    blockUnblock: (email: string) => requests.patch(`/usr/${email}`, email),
    wallet: () => requests.get<Wallet>('/wallet'),
    transaction: () => requests.get<Transaction[]>('/usr/transaction'),
}

// payment endpoints
const Payments = {
    all: () => requests.get<Payment[]>('/payment'),
    create: (data: PaymentFormValue) => requests.post<Payment>('/payment', data),
    update: (data: PaymentFormValue, slug: string | undefined) => requests.put<Payment>(`/payment/${slug}`, data),
    upload : (file: any) => {
        let formData = new FormData()
        formData.append('File', file)
        return axios.post<string>('/payment/upload', formData/*, {
            headers: {'Content-type': 'multipart/form-data'}
        }*/)
    },
    delete: (slug: string) => requests.del(`/payment/${slug}`),
}

// transaction endpoint
const Transactions = {
    all: () => requests.get<Transaction[]>('/transaction'),
    approved: () => requests.get<Transaction[]>('/transaction/approved'),
    declined: () => requests.get<Transaction[]>('/transaction/declined'),
    pending: () => requests.get<Transaction[]>('/transaction/pending'),
    create: (data: TransactionFormValues) => requests.post<Transaction[]>('/transaction', data),
    confirm: (data: {}, uuid: string) => requests.patch<Transaction[]>(`/transaction/${uuid}`, data),
    totals: () => requests.get<TransactionTotal>('transaction/total'),
    allTotals: () => requests.get<TransactionTotal>('transaction/total/all'),
}

const agent = {
    Users,
    Payments,
    Transactions,
}

export default agent