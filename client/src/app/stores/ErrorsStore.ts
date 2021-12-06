import {makeAutoObservable, runInAction} from "mobx";
import ErrorResponse from "../models/ErrorResponse";

export default class ErrorsStore {

    hasErrors: boolean = false;
    errors: ErrorResponse | null = null

    constructor() {
        makeAutoObservable(this)
    }

    // set errors
    setErrors = (errors: ErrorResponse ) => {
        runInAction(() => {
            this.hasErrors = true
            this.errors = errors
        })
    }

    // get errors
    getErrors = () => {
        return this.errors
    }

    // reset errors
    reset = () => {
        runInAction(() => {
            this.hasErrors = false
            this.errors = null
        })
    }
}