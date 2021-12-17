import axios, { AxiosResponse } from "axios";
import { Post, PostFormValues } from "../models/post";
import { User, UserFormValues } from "../models/user";
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
    create: (post: PostFormValues) => request.post<void>('/home/posts', post),
    edit: (post: PostFormValues) => request.put<void>(`/home/posts/${post.id}`, post),
    delete: (id: number) => request.delete<void>(`/home/posts/${id}`),
}
const Account = {
    Current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>(`/account`, user),
    register: (user: UserFormValues) => axios.post<User>('/account/register', user),
}

const agent = {
    Account,
    Posts
}

export default agent