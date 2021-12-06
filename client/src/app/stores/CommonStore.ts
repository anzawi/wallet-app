import {makeAutoObservable, reaction} from "mobx";

/**
 * check if token is set in browser
 */

export default class CommonStore {
    appLoaded: boolean = false
    token: string | null = window.localStorage.getItem('jwt')
    constructor() {
        makeAutoObservable(this)
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}