import axios from "axios"
const baseUrl = 'http://localhost:8080'
var token = null

const setToken = (newObject) => {
    token = newObject
}
const createUser = async (formData) => {
    const config = {
        headers: {
            "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhmYmJhYjMzMDA3N2ViNWNlNjUxN2UiLCJleHAiOjE2ODkwMTQ1NTIsIm5hbWV1c2VyIjoiYnJ1bm8ifQ.tgbnctMAmgYMWDzZyLyRG7NVecwXPfJ09iK-b0CTL0A`,
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
    const res = await axios.post(`${baseUrl}/user/login`, newObject, config)
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

const PostCreate = async (FormData) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    }
    console.log(token);
    const res = await axios.post(
        `${baseUrl}/post/postCreate`,
        FormData,
        config
    )
    return res
}
const PostGetFollow = async (FormData) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
    const res = await axios.get(
        `${baseUrl}/post/postGetFollow`,
        config
    )
    return res
}
const searchuser = async (newObject) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    let nameuser = newObject
    const res = await axios.post(
        `${baseUrl}/Searchuser`,
        nameuser,
        config
    )
    return res
}
const LikePost = async (object) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
    console.log(token);
    console.log(object.idTweet);
    const res = await axios.post(`${baseUrl}/post/posttLike`, object, config)
    console.log(res);
    return res
}
const DislikePost = async (object) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }
    const res = await axios.post(`${baseUrl}/post/postDislike`, object, config)
    return res
}
const CommentPost = async (object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/post/CommentPost`, object, config)
    return res
}
const AskForChampionship = async (object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/AskForChampionship`, object, config)
    return res
}
const ApplyChampionship = async (object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/ApplyChampionship`, object, config)
    return res
}
const AcceptedApplicants = async (object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/AcceptedApplicants`, object, config)
    return res
}
const MatchUser = async () => {
    let req = {
        Pais: "ARG",
        Ciudad: "CBA",
        birthDate: "",
        // sex: "mujer",
        situation: "",
        Instruments: {
            "piano": 2,
            "guitarra": 2
        },
        Genders: ["ROCK"],
        Experience: 0,
        ZodiacSign: "leo",
        PageSize: 10
    }
    const res = await axios.post(
        `${baseUrl}/user/MatchWithUsers`, req
    )
    return res
}
const follow = async (object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/user/follow`, object, config)
    return res
}
const Unfollow = async (object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(`${baseUrl}/user/Unfollow`, object, config)
    return res
}
const exportedObject = {
    follow,
    Unfollow,
    CommentPost,
    MatchUser,
    PostGetFollow,
    LoginUser,
    setToken,
    searchRefService,
    PostCreate,
    // GetPost,
    searchuser,
    LikePost,
    DislikePost,
    AskForChampionship,
    ApplyChampionship,
    AcceptedApplicants
}
export default exportedObject