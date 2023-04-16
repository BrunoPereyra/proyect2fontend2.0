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
            Authorization: `bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/login`, newObject, config)
    return res
}
const searchRefService = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
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
const ProfileGet = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    const res = await axios.get(
        `${baseUrl}/ProfileGet`,
        config
    )
    return res
}

const GetNotes = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }

    const res = await axios.get(
        `${baseUrl}/GetNotes`,
        config
    )
    return res
}

const createServiceBasic = async (formData) => {

    const config = {
        headers: {
            "Authorization": `bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    const res = await axios.post(
        `${baseUrl}/createServiceBasic`,
        formData,
        config
    )
    return res

}
const ProfileGetOther = async (newObject) => {

    const config = {
        headers: {
            "Authorization": `bearer ${token}`,
        }
    }
    const res = await axios.post(
        `${baseUrl}/ProfileGetOther`,
        newObject,
        config
    )
    return res
}
const Onechat = async (newObject) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const res = await axios.get(
        `${baseUrl}/api/messages?recipientId=${newObject}`,
        config
    )
    return res
}
const GetAllChats = async () => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const res = await axios.get(
        `${baseUrl}/GetAllChats`,
        config
    )
    return res
}
const exportedObject = {
    createUser,
    LoginUser,
    setToken,
    searchRefService,
    ProfileGet,
    ProfileGetOther,
    GetNotes,
    createServiceBasic,
    Onechat,
    GetAllChats
}
export default exportedObject