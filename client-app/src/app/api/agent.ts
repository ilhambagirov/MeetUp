import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Post, PostFormValues } from "../models/post";
import { Profile } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { ChangePassword } from "../models/userPasswordChange";
import { dark } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:44395/api'
axios.interceptors.request.use(config => {
    const token = dark.commonStore.token

    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})
axios.interceptors.response.use(async response => {
    await sleep(200);
    return response;
},
    (error: AxiosError) => {
        const { data, status } = error.response!
        switch (status) {
            case 400:
                toast.error(data.errors[Object.keys(data.errors)[0]][0])
                break;
            case 401:
                toast.error('UnAuthorized')
                break;
            case 404:
                dark.commonStore.setServerError(data)
                history.push('/server-error')
                break;
            case 500:
                dark.commonStore.setServerError(data)
                history.push('/server-error')
                break;
            default:
                break;
        }
        return Promise.reject(error)
    }
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(id: string, body: {}) => axios.put<T>(id, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}
const Posts = {
    list: () => request.get<Post[]>('/home/posts'),
    create: (post: PostFormValues) => request.post<Post>('/home/posts', post),
    edit: (post: PostFormValues) => request.put<void>(`/home/posts/${post.id}`, post),
    delete: (id: number) => request.delete<void>(`/home/posts/${id}`),
}
const Account = {
    Current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>(`/account`, user),
    register: (user: UserFormValues) => axios.post<User>('/account/register', user),
    changePassword: (passwordModel: ChangePassword) => axios.post<void>('/account/changepassword', passwordModel),
}

const agent = {
    Account,
    Posts
}

export default agent