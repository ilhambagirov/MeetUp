import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { dark } from "./store";
import jwt_decode from "jwt-decode";

export default class UserStore {

    Jwt: string | null = window.localStorage.getItem('jwt')
    token: string = this.Jwt == null ? '' : this.Jwt
    DecodedJwt: User | null = this.token == '' ? null : jwt_decode(this.token)

    user: User | null =this.DecodedJwt ==null? null : {
        displayName: this.DecodedJwt.displayName,
        userName: this.DecodedJwt.userName,
        token: window.localStorage.getItem('jwt')!}


    constructor() {
        makeAutoObservable(this)
        this.Jwt = window.localStorage.getItem('jwt')
    }

    get isLoggedIn() {
        console.log(this.DecodedJwt)
        return !!this.user
    }

    login = async (creds: UserFormValues) => {
        console.log(creds)
        try {
            const user = await agent.Account.login(creds)
            dark.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push("/home")
        } catch (error) {
            console.log('partladi')
            throw error;
        }
    }

    logout = () => {
        dark.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
        history.push("/")
    }

    getUser = async () => {
        try {
            const user = await agent.Account.Current()
            runInAction(() => this.user = user)
        } catch (error) {
            throw error
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            dark.commonStore.setToken(user.data.token)
            runInAction(() => this.user = user.data)
            history.push("/activities")
        } catch (error) {
            throw error;
        }
    }




}