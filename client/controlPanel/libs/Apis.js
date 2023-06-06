import axios from "axios"
const serverUrl = process.env.REACT_APP_SERVER_URL;

// Category Apis
export const getCategoryAll = async (query, token)=>{
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/category/view?limit=${query.limit}&page=${query.page}`).then((response) => response.data)
    return promise
}

export const getCategoryOne = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/category/view/${id}`).then((response) => response.data)
    return promise
}

export const saveCategory = async (data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.post(serverUrl + '/api/category/create', data).then((response) => response.data)
    return promise
}

export const putCategory = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.put(serverUrl + `/api/category/update/${id}`, data).then((response) => response.data)
    return promise
}

export const deleteCategory = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.delete(serverUrl + `/api/category/delete/${id}`).then((response) => response.data)
    return promise
}


// File/Media Apis
export const imageStore = async (data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.post(serverUrl + '/api/images/create', data).then((response) => response.data)
    return promise
}

export const imageOneView = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/images/view/${id}`).then((response) => response.data)
    return promise
}

export const imageAllView = async (query, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/images/view?limit=${query.limit}&page=${query.page}`).then((response) => response.data)
    return promise
}

export const imageOneUpdate = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.put(serverUrl + `/api/images/update/${id}`, data).then((response) => response.data)
    return promise
}

export const imageOneDelete = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.delete(serverUrl + `/api/images/delete/${id}`).then((response) => response.data)
    return promise
}


// Product Apis
export const getAllProduct = async (query, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/product/view?limit=${query.limit}&page=${query.page}`).then((response) => response.data)
    return promise
}

export const getOneProduct = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/product/view/${id}`).then((response) => response.data)
    return promise
}

export const saveProduct = async (data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.post(serverUrl + `/api/product/create`, data).then((response) => response.data)
    return promise
}

export const updateProduct = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.put(serverUrl + `/api/product/update/${id}`, data).then((response) => response.data)
    return promise
}

export const productDelete = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.delete(serverUrl + `/api/product/delete/${id}`).then((response) => response.data)
    return promise
}

export const searchProduct = async (query) => {
    const promise = await axios.get(serverUrl + `/api/product/search?text=${query}`).then((response) => response.data)
    return promise
}


// main banner

export const mainBannerCreate = async (data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.post(serverUrl + `/api/mainBanner/create`, data).then((response) => response.data)
    return promise
}

export const getMainBanner = async (token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/mainBanner/view`).then((response) => response.data)
    return promise
}

export const updateMainBanner = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.put(serverUrl + `/api/mainBanner/update/${id}`, data).then((response) => response.data)
    return promise
}

export const deleteMainBanner = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.delete(serverUrl + `/api/mainBanner/delete/${id}`).then((response) => response.data)
    return promise
}

// semi banner

export const semiBannerCreate = async (data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.post(serverUrl + `/api/semiBanner/create`, data).then((response) => response.data)
    return promise
}

export const getSemiBanner = async (token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/semiBanner/view`).then((response) => response.data)
    return promise
}

export const updateSemiBanner = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.put(serverUrl + `/api/semiBanner/update/${id}`, data).then((response) => response.data)
    return promise
}


export const deleteSemiBanner = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.delete(serverUrl + `/api/semiBanner/delete/${id}`).then((response) => response.data)
    return promise
}

// admin login

export const adminLogin = async (data) => {
    const promise = await axios.post(serverUrl + `/api/user/loginAdmin`, data).then((response) => response.data)
    return promise
}

// get admin record

export const adminRecord = async (token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.get(serverUrl + `/api/user/getAdmin`).then(res => res.data)
    return response;
}


// get orders 

// get all order

export const getOrder = async (query, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.get(serverUrl + `/api/order/getOrder?limit=${query.limit}&page=${query.page}`).then(res => res.data)
    return response;
}

// delete one order

export const deleteOrder = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.delete(serverUrl + `/api/order/delete/${id}`).then(res => res.data)
    return response;
}


// get one order

export const getOneOrder = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.get(serverUrl + `/api/order/getOrder/${id}`).then(res => res.data)
    return response;
}

// update one order

export const updateOrder = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.put(serverUrl + `/api/order/update/${id}`, data).then(res => res.data)
    return response;
}

// get order status for dashboard

export const getStatusOrder = async (text, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.get(serverUrl + `/api/order/getStatusOrder/${text}`).then(res => res.data)
    return response;
}

// search order

export const searchOrder = async (query) => {
    const promise = await axios.get(serverUrl + `/api/order/search?text=${query}`).then((response) => response.data)
    return promise
}


// Site setting get

export const siteSetting = async (token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/setting/getSetting`).then((response) => response.data)
    return promise
}


// Site setting update

export const updateSetting = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.put(serverUrl + `/api/setting/updateSetting/${id}`, data).then((response) => response.data)
    return promise
}


// create page

export const createPage = async (data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.post(serverUrl + `/api/page/createPage`, data).then((response) => response.data)
    return promise
}

// get page

export const getPage = async (token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/page/getPage`).then((response) => response.data)
    return promise
}


// get page by id

export const getPageById = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.get(serverUrl + `/api/page/getPageById/${id}`).then((response) => response.data)
    return promise
}

// update page by id

export const updatePageById = async (id, data, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.put(serverUrl + `/api/page/updatePage/${id}`, data).then((response) => response.data)
    return promise
}

// update page by id

export const deletePageById = async (id, token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    const promise = await authAxios.delete(serverUrl + `/api/page/deletePage/${id}`).then((response) => response.data)
    return promise
}





