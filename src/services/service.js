import axios from "axios"
const baseUrl = 'http://localhost:3001'
var token = null

const setToken = (newObject) => {
    token = newObject
}
const createUser = async (formData) => {

    const config = {
        headers: {
            // "Authorization": `bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    const res = await axios.post(
        `${baseUrl}/signup`,
        formData,
        config
    )
    return res
}
const LoginUser = async (newObject) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/login`, newObject, config)
    return res
}
const searchRefService = async (newObject) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const filter = newObject.filter
    const data = { filter };

    const res = await axios.post(
        `${baseUrl}/services${newObject.query}`,
        data,
        config
    )
    return res
}
const Currentuser = async (newObject) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(
        `${baseUrl}/currentuser`,
        config
    )
    return res
}
const Postupload = async (FormData) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }

    const res = await axios.post(
        `${baseUrl}/UploadPost`,
        FormData,
        config
    )
    return res
}

const GetPost = async (FormData) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }

    const res = await axios.get(
        `${baseUrl}/getPost`,
        config
    )
    return res
}
const exportedObject = {
    LoginUser,
    setToken,
    searchRefService,
    Currentuser,
    Postupload,
    GetPost
}
export default exportedObject