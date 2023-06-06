import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL

// Main Banner APi
export const mainBanners = async () => {
    let response = await axios.get(`${apiURL}/api/mainBanner/client/view`).then(res => res.data)
    return response;
}

// Semi Banner Api
export const semiBanners = async () => {
    let response = await axios.get(`${apiURL}/api/semiBanner/client/view`).then(res => res.data)
    return response;
}

// Category Api
export const getAllCategory = async () => {
    let response = await axios.get(`${apiURL}/api/category/client/view`).then(res => res.data)
    return response;
}

// Category by slug Api
export const getCategoryBySlug = async (param) => {
    let response = await axios.get(`${apiURL}/api/category/client/view/${param}`).then(res => res.data)
    return response;
}

// featured product Api
export const featuredProduct = async (query) => {
    let response = await axios.get(`${apiURL}/api/product/client/featured?limit=${query.limit}`).then(res => res.data)
    return response;
}

// get all product Api
export const getAllProduct = async (query) => {
    let response = await axios.get(`${apiURL}/api/product/client/view?limit=${query.limit}&page=${query.page}`).then(res => res.data)
    return response;
}

// get product by slug Api
export const getProductBySlug = async (param) => {
    let response = await axios.get(`${apiURL}/api/product/client/view/${param}`).then(res => res.data)
    return response;
}

// get product by category slug Api
export const getProductByCategorySlug = async (param) => {
    let response = await axios.get(`${apiURL}/api/product/client/viewByCategory/${param}`).then(res => res.data)
    return response;
}

// user login

export const userLogin = async (data) => {
    let response = await axios.post(`${apiURL}/api/user/login`, data).then(res => res.data)
    return response;
} 

// user signup

export const userSignUp = async (data) => {
    let response = await axios.post(`${apiURL}/api/user/create`, data).then(res => res.data)
    return response;
} 

// get user record

export const userRecord = async (token) => {
    let authAxios = axios.create({
                        headers: {
                            Authorization: `${token}`
                        }
                    })
    let response = await authAxios.get(`${apiURL}/api/user/getUser`).then(res => res.data)
    return response;
} 

// place order

export const orderPlaced = async (token, order) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.post(`${apiURL}/api/order/orderReceive`, order).then(res => res.data)
    return response;
} 


// tracking order

export const orderTrack = async (trackingId) => {
    let response = await axios.get(`${apiURL}/api/order/tracking/${trackingId}`).then(res => res.data)
    return response;
} 


// site setting

export const getSettingForClient = async () => {
    let response = await axios.get(`${apiURL}/api/setting/getSettingForClient`).then(res => res.data)
    return response;
} 

// order for user
export const orderForClient = async (token) => {
    let authAxios = axios.create({
        headers: {
            Authorization: `${token}`
        }
    })
    let response = await authAxios.get(`${apiURL}/api/order/orderForClient`).then(res => res.data)
    return response;
}

// get page 
export const getPageBySlug = async (slug) => {
    let response = await axios.get(`${apiURL}/api/page/getPageBySlug/${slug}`).then(res => res.data)
    return response;
}

// page for menu
export const getPageSlug = async (params) => {
    let response = await axios.get(`${apiURL}/api/page/getPageSlug/${params}`).then(res => res.data)
    return response;
}

// product search
export const searchProduct = async (query) => {
    const promise = await axios.get(apiURL + `/api/product/search?text=${query}`).then((response) => response.data)
    return promise
}


