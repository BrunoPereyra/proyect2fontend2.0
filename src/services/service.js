import axios from "axios"
const baseUrl = 'http://localhost:8080'
var token = null

const setToken = (newObject) => {
    token = newObject
}
const SendMessageChat = async ({ message, chatId }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(
        `${baseUrl}chatStreaming/${chatId}`,
        { message },
        config
    );
    return res
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
const MatchUser = async (filters) => {
    console.log(filters);
    const res = await axios.post(
        `${baseUrl}/user/MatchWithUsers`, filters
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
const GoogleLoginURL = async () => {
    const res = await axios.get(
        `${baseUrl}/user/google_login`, {}
    )
    console.log(res);

    return res
}
const Google_callback = async (code) => {
    const res = await axios.get(
        `${baseUrl}/user/google_callback?code=${code}`
    );

    return res;
};
const Google_callback_Complete_Profile_And_Username = async (data) => {
    const res = await axios.post(
        `${baseUrl}/user/Google_callback_Complete_Profile_And_Username`,
        data,
        {

        }
    );

    return res;
};
const exportedObject = {
    Google_callback_Complete_Profile_And_Username,
    Google_callback,
    GoogleLoginURL,
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
    AcceptedApplicants,
    SendMessageChat
}
export default exportedObject