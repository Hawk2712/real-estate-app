import { HttpClient } from "../lib/network/http-client";

const fetchData = (URL, params = {}) => {
    return new Promise((resolve, reject) => {
        HttpClient.Get(URL, { params })
            .then((res) => resolve(res))
            .catch((e) => reject(new Error(e)));
    })
}

const createData = (URL, data) => {
    return new Promise((resolve, reject) => {
        HttpClient.Post(URL, data)
            .then((res) => resolve(res))
            .catch((e) => reject(new Error(e)));
    })
}


const updateData = (URL, data) => {
    return new Promise((resolve, reject) => {
        HttpClient.Put(URL, data)
            .then((res) => resolve(res))
            .catch((e) => reject(new Error(e)));
    })
}

const deleteData = (URL, params = {}) => {
    return new Promise((resolve, reject) => {
        HttpClient.Delete(URL, { params })
            .then((res) => resolve(res))
            .catch((e) => reject(new Error(e)));
    })
}

const loginUser = (URL, data) => {
    return new Promise((resolve, reject) => {
        HttpClient.Post(URL, data)
            .then((res) => resolve(res))
            .catch((e) => reject(new Error(e)));
    })
}
export const ApiService = {
    fetchData, createData, updateData, deleteData, loginUser
}