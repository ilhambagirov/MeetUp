import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Post, PostFormValues } from "../models/post";
import { Profile } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { Message } from "../models/message";
import { ChangePassword } from "../models/userPasswordChange";
import { dark } from "../stores/store";
import { PaginatedResult } from "../models/pagination";
import swal from "sweetalert";

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
    const pagination = response.headers['pagination']
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination))
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
},
    (error: AxiosError) => {
        const { data, status } = error.response!
        switch (status) {
            case 400:
                console.log(data)
                swal(data.errors[Object.keys(data.errors)[0]][0], {
                    icon: "error",
                });
                dark.userStore.errorData = data.errors[Object.keys(data.errors)[0]][0]
                break;
            case 401:
                swal("Your are not logged in!", {
                    icon: "error",
                });
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

const Universities = {
    get: () => axios.get('http://universities.hipolabs.com/search?country=azerbaijan').then(responseBody),
}

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(id: string, body: {}) => axios.put<T>(id, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}
// request.post<Post>('/home/posts', post)
const Posts = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Post[]>>('/home/posts', { params }).then(responseBody),
    create: (post: PostFormValues) => {
        let formData = new FormData()
        formData.append('Title', post.title)
        formData.append('File', post.filePath)
        return axios.post<Post>('/home/posts', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
    edit: (post: PostFormValues) => request.put<void>(`/home/posts/${post.id}`, post),
    delete: (id: number) => request.delete<void>(`/home/posts/${id}`),
}
const Account = {
    Current: () => request.get<User>('/account'),
    userProfile: (userName: string) => request.get<User>(`/account/userProfile/${userName}`),
    login: (user: UserFormValues) => request.post<User>(`/account`, user),
    register: (user: UserFormValues) => axios.post<User>('/account/register', user),
    changePassword: (passwordModel: ChangePassword) => axios.post<void>('/account/changepassword', passwordModel),
    updateUserDetails: (user: UserFormValues) => request.post<User>('/account/updateuserdetails', user),
    emailConfirm: (token: string, username: string) => request.get<User>(`/account/register-email-confirm?token=${token}&username=${username}`),
    updateFolowing: (userName: string) => request.post(`follow/${userName}`, {}),
    listFollow: (userName: string, predicate: string) => request.get<User[]>(`follow/${userName}?predicate=${predicate}`),
    searchUser: (userName: string) => request.get<User[]>(`Account/SearchUser/${userName}`)
}
const Photos = {
    create: (file: any) => {
        let formData = new FormData()
        formData.append('File', file)
        return axios.post<User>('/Photo', formData, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
    },
}
const Chat = {
    usersList: () => request.get<User[]>('chat'),
    messages: (userName: string) => request.get<Message[]>(`chat/firendId/${userName}`)
}
const Like = {
    like: (id: number) => request.post(`like/${id}`,{}),
}
const agent = {
    Account,
    Posts,
    Universities,
    Photos,
    Chat,
    Like
}
export default agent