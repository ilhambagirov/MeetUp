import axios from "axios";
import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError";

export default class ServerErrorStore {
    token: string | null = window.localStorage.getItem('jwt') ? window.localStorage.getItem('jwt') : null
    appLoaded = false
    error: ServerError | null = null

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                }
                else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }
    setToken = (token: string | null) => {
        this.token = token
    }

    setAppLoaded = () => {
        this.appLoaded = true
    }

    setServerError(error: ServerError) {
        this.error = error
    }
}