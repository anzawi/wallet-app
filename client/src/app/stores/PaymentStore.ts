import {makeAutoObservable, runInAction} from "mobx";
import {Payment, PaymentFormValue} from "../models/Payment";
import agent from "../api/agent";
import {store} from "./store";

export default class PaymentStore {
    payments: Payment[] = [];
    image: string = ''

    constructor() {
        return makeAutoObservable(this)
    }

    // get all payments
    getAll = async () => {
        try {
            const payments = await agent.Payments.all()
            runInAction(() => {
                this.payments = payments
            })
        } catch (err) {
            throw err
        }
    }

    // create new payment
    create = async (data: PaymentFormValue) => {
        data.img = this.image
        try {
            const payment = await agent.Payments.create(data)
            runInAction(() =>{
                this.payments.push(payment)
                store.modalStore.closeModal()
            })
        } catch (err) {
            throw err
        }
    }

    // update payment
    update = async (data: PaymentFormValue) => {
        data.img = this.image
        try {
            const payment = await agent.Payments.update(data, data.slug)
            runInAction(() =>{
                const index = this.payments.findIndex(x => x.slug === payment.slug);
                this.payments[index] = payment
                store.modalStore.closeModal()
            })
        } catch (err) {
            throw err
        }
    }

    // delete payment
    delete = async (slug: string) => {
        try {
            await agent.Payments.delete(slug)
            runInAction(() =>{
                this.payments = this.payments.filter((payment) => {
                    return payment.slug !== slug
                })
            })
        } catch (err) {
            throw err
        }
    }

    // upload payment image
    uploadImage = async (img: any) => {
        try {
            const imgPath = await agent.Payments.upload(img)
            this.setImage(imgPath.data)
        } catch (err) {
            throw err
        }
    }

    // set payment image as uploaded image
    setImage = (path: string) => {
        this.image = path
    }
}