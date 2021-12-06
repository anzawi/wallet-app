import {RegisterFormValues, User, UserFormValues} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {history} from "../helpers";
import Transaction from "../models/Transaction";
import {Wallet} from "../models/Wallet";

export default class UserStore {
    user: User | null = null
    allUsers: User[] = []

    wallet: Wallet | null = null
    transactions: Transaction[] = []

    constructor() {
        return makeAutoObservable(this);
    }

    /**
     * return true if user logged-in / false if not
     */
    get isLoggedin() {
        return !!this.user
    }

    /**
     * login user
     * @param creds
     */
    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Users.login(creds)
            runInAction(() => {
                store.commonStore.setToken(user.token)
                this.user = user;
            })

            history.push('/dashboard')
        } catch (err) {
            throw err
        }
    }

    /**
     * logout user
     */
    logout = async () => {

        try {
            await agent.Users.logout()
            store.commonStore.setToken(null)
            runInAction(() => {
                runInAction(() => {
                    this.user = null;
                })
                window.localStorage.removeItem('jwt')
            })
            history.push('/')
        } catch (err) {
            throw err
        }
    }

    /**
     * register user
     * @param values
     */
    register = async (values: RegisterFormValues) => {
        try {
            await agent.Users.register(values)
            history.push('/')
        } catch (err) {
            throw err
        }
    }

    /**
     * get logged-in user details
     */
    getCurrentUser = async () => {
        try {
            const user = await agent.Users.current()
            runInAction(() => {
                this.user = user
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * get all users
     */
    listUsers = async () => {
        try {
            const users = await agent.Users.list()
            runInAction(() => {
                this.allUsers = users
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * block user or unblock him
     * @param email
     */
    blockUnblock = async (email: string) => {
        try {
            await agent.Users.blockUnblock(email)
            runInAction(() => {
                const index = this.allUsers.findIndex(x => x.email === email);
                this.allUsers[index].blocked = !this.allUsers[index].blocked
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * get user wallet details
     */
    getUserWallet = async () => {
        try {
            const wallet = await agent.Users.wallet()
            runInAction(() => {
                this.wallet = wallet
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * get user transactions
     */
    getUserTransaction = async () => {
        try {
            const transactions = await agent.Users.transaction()
            runInAction(() => {
                this.transactions = transactions
            })
        } catch (err) {
            throw err
        }
    }

    /**
     * return true if logged-in user is admin / false if not
     */
    get isAdmin () {
        return this.isLoggedin && this.user?.is_admin
    }
}