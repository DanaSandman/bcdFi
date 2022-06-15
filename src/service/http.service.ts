import axios from 'axios'

const BASE_URL:string = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

export const httpService = {
    get(endpoint:string, data:any |null | undefined) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint:string, data:any |null | undefined) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint:string, data:any |null | undefined) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint:string) {
        return ajax(endpoint, 'DELETE')
    }
};

async function ajax(endpoint:string, method = 'GET', data = null) {
    try {   
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        });
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
    };
};

