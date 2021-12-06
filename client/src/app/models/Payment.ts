export interface Payment {
    name: string
    currencies: string
    deposit: MaxMinPayment
    withdrawal: MaxMinPayment
    img: string
    slug: string
}

export interface MaxMinPayment {
    max: number
    min: number
}

export interface PaymentFormValue {
    name: string
    currencies: string
    max_deposit: string
    min_deposit: string
    max_withdrawal: string
    min_withdrawal: string
    img: string
    slug?: string
}