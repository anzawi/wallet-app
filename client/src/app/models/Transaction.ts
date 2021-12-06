export default interface Transaction {
    user: string
    type: string
    confirmed: string
    amount: string
    uuid: string
    status: string
}

export interface TransactionTotal {
    approved: number
    declined: number
    pending: number
}

export interface TransactionFormValues {
    payment_method: string
    transaction_type: string
    amount: number
}