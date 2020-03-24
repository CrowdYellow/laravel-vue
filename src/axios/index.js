import axios from 'axios';
import qs from 'qs';
axios.defaults.timeout = 500000;
const domain = 'http://laravel.7.com';
const suffix = '/api/v1/frontend/';

export function fetch(url, params = {}, header={},prefix=true) {
    return new Promise((resolve, reject) => {
        axios.get(prefix?`${domain}${suffix}${url}`:`${url}`, {
            params: params,
            headers:header
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function post(url, data ,header={} ) {
    return new Promise((resolve, reject) => {
        axios.post(`${domain}${suffix}${url}`, qs.stringify(data),
            {
                headers:header
            }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(`${domain}${suffix}${url}`, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(`${domain}${suffix}${url}`, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export function destroy(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(`${domain}${suffix}${url}`, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}