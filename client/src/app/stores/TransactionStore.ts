import {makeAutoObservable, runInAction} from "mobx";
import Transaction, {TransactionFormValues, TransactionTotal} from "../models/Transaction";
import agent from "../api/agent";
import {store} from "./store";

export default class TransactionStore {
    all: Transaction[] = []
    loaded = false
    totals: TransactionTotal | null = null

    /* Read last comment */
    // approved: Transaction[] = []
    // declined: Transaction[] = []
    // pending: Transaction[] = []

    current: Transaction[] = []

    // get total count for all transaction
    get totalTransaction() {
        return this.totals?.declined! + this.totals?.approved! + this.totals?.pending!
    }

    // setup tabs
    tabs = new Map<string, boolean>()

    constructor() {
        makeAutoObservable(this)

        this.initTabs()
    }

    // initialize tabs
    initTabs = () => {
        const tempTabs = ["all", "pending", "approved", "declined"]
        for (let i = 0; i < tempTabs.length; i++) {
            this.tabs.set(tempTabs[i], false)
        }
    }

    /**
     * select table
     * @param tab
     */
    setTab = (tab: string) => {
        this.initTabs()
        this.tabs.set(tab, true)

        if (tab === 'all') {
            this.current = this.all
            return
        }

        this.current = this.all.filter((transaction) => {
            return transaction.status === tab
        })
    }

    /**
     * get data for chart in dashboard
     */
    getDataForChart = async () => {
        const totals = await agent.Transactions.allTotals()
        try {
            runInAction(() => {
                this.loaded = true
                this.totals = totals
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * get all transactions from server
     */
    getAllTransaction = async () => {
        try {
            const transactions = await agent.Transactions.all()
            runInAction(() => {
                this.current = this.all = transactions
                this.setTab('pending')
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * edit transaction
     * @param uuid
     * @param type
     */
    change = async (uuid: string, type: string) => {
        try {
            await agent.Transactions.confirm({type: type}, uuid)
            runInAction(() => {
                const allIndex = this.all.findIndex(x => x.uuid === uuid)
                this.all[allIndex].status = type

                if (this.tabs.get('all') === false)
                    this.current = this.current.filter(x => {
                        return x.uuid !== uuid
                    })
            })
        } catch (err) {
            throw err
        }
    }

    // get total counts for transaction for logged user
    totalsByUser = async () => {
        try {
            const result = await agent.Transactions.totals()
            runInAction(() => {
                this.totals = result
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * create new transaction
     * @param values
     * @param setSubmitting
     */
    create = async (values: TransactionFormValues, setSubmitting: any) => {
        try {
            await agent.Transactions.create(values)
            runInAction(() => {
                this.totals!.pending++
            })
            store.modalStore.closeModal()
            setSubmitting(false)
        } catch (err: any) {
            throw err
        }
    }


    /**
     * actually we dont need call every endpoint
     * we jus call endpoint to get transaction
     * and then we can filter by status
     * I wrote this functions for test only
     * we can using it if we need that and
     * create variable called -currentTransactions-
     * and then set values to it and work with.
     * but in this time I just want to make this app simple as I can
     */

    /*getApprovedTransaction = async () => {
        try {
            const transactions = await agent.Transactions.approved()
            runInAction(() => {
                this.approved = transactions
            })
        } catch (err) {
            throw err
        }
    }

    getDeclinedTransaction = async () => {
        try {
            const transactions = await agent.Transactions.declined()
            runInAction(() => {
                this.declined = transactions
            })
        } catch (err) {
            throw err
        }
    }

    getPendingTransaction = async () => {
        try {
            const transactions = await agent.Transactions.pending()
            runInAction(() => {
                this.pending = transactions
            })
        } catch (err) {
            throw err
        }
    }*/
}