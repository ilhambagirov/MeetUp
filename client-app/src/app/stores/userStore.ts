import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { PasswordValues, User, UserFormValues } from "../models/user";
import { dark } from "./store";
import { ChangePassword } from "../models/userPasswordChange";
import { toast } from "react-toastify";
import { Post } from "../models/post";
import swal from "sweetalert";

export default class UserStore {
    // Jwt: string | null = window.localStorage.getItem('jwt')
    // token: string = this.Jwt == null ? '' : this.Jwt
    // DecodedJwt: User | null = this.token == '' ? null : jwt_decode(this.token)
    user: User | Promise<User> | null = null
    errorData: string
    tokenIsValid: string | null = null
    userIn: number | null = null
    // this.DecodedJwt == null ? null : {
    //     id: this.DecodedJwt.id,
    //     dsiplayName: this.DecodedJwt.dsiplayName,
    //     userName: this.DecodedJwt.userName,
    //     token: window.localStorage.getItem('jwt')!
    // }
    constructor() {
        makeAutoObservable(this)
        this.tokenIsValid = localStorage.getItem('tokenValid')
        if (localStorage.getItem("jwt") !== null) {
            runInAction(() => {
                this.user = this.loadUser()
                this.userIn = 1
            }
            )
        } else {
            runInAction(() => this.userIn = null)
        }
        // if (window.location.pathname !== '/' && window.location.pathname !== '/register' &&
        //     window.location.pathname !== '/adminDashboard' && window.location.pathname !== '/admin' &&
        //     !window.location.pathname.includes('confirm') && window.location.pathname !== '/passwordreset' &&
        //     window.location.pathname !== '/confirmResetPassword') {
        //    
        // }
    }
    get isLoggedIn() {
        var result = false
        this.userIn === null ? result = false : result = true
        return result
    }
    getUser = async () => {
        try {
            const user = await agent.Account.Current()
            runInAction(() => this.user = user)
            dark.postStore.postRegistry.clear()
            user.posts?.forEach((a: Post) => dark.postStore.setActivity(a))
            return user;
        } catch (error) {
            throw error
        }
    }

    loadUser = async () => {
        try {
            const user = await agent.Account.Current()
            console.log(user)
            runInAction(() => this.user = user)
            return user;
        } catch (error) {
            console.log("boom")
            throw error
        }
    }
    login = async (creds: UserFormValues) => {
        console.log(creds)
        try {
            const user = await agent.Account.login(creds)
            dark.commonStore.setToken(user.token)
            runInAction(() => {
                this.user = user
                this.userIn = 1
            })
            history.push("/home")
            console.log(this.user)
        } catch (error) {
            console.log('partladi')
            throw error;
        }
    }

    resetPassword = async (values: any) => {
        try {
            console.log(values.email)
            await agent.Account.resetPassword(values.email)
            localStorage.setItem('tokenValid', 'Yes')
            history.push("/")
            swal("Reset Password Confirmation Link has been sent to your email address!", {
                icon: "success",
            });
        } catch (error) {
            console.log('partladi')
            throw error;
        }
    }

    logout = () => {
        console.log("salamun aleykum")
        dark.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
        dark.postStore.postRegistry.clear()
        dark.commentStore.commentMode = 0
        history.push("/")
    }


    changeUserPassword = async (creds: ChangePassword) => {
        try {
            await agent.Account.changePassword(creds)
            history.push("/home")
            swal("Password Changed!", {
                icon: "success",
            });
        } catch (error) {
            throw error;
        }
    }

    updateUserDetails = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.updateUserDetails(creds)
            runInAction(() => this.user = user)
            swal("Your Account Details has been updated!", {
                icon: "success",
            });
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            dark.commonStore.setToken(user.data.token)
            history.push("/")
            swal("Email Confirmation link was send to your email address. Please confirm!", {
                icon: "success",
            });
        } catch (error) {
            throw error;
        }
    }

    emailConfirm = async (token: string, username: string) => {
        try {
            await agent.Account.emailConfirm(token, username)
            setTimeout(() => {
                history.push("/")
            }, 2000)
        } catch (error) {
            throw error;
        }
    }

    resetPasswordConfirm = async (token: string, email: string, password: PasswordValues) => {
        try {
            await agent.Account.resetPasswordConfirm(token, email, password)
            localStorage.removeItem('tokenValid')
            history.push("/")
            swal("Your password has been changed", {
                icon: "success",
            });
        } catch (error) {
            throw error;
        }
    }




}