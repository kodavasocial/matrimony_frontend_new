import axios from "axios"
import { Api } from "../../Utils/ApiUrl"
import { header } from "../../Utils/Function"
import { AI_MESSAGE_FAILURE, AI_MESSAGE_REQUEST, AI_MESSAGE_SUCCESS, COMMUNITIES_FAILURE, COMMUNITIES_REQUEST, COMMUNITIES_SUCCESS, FAMILYNAME_FAILURE, FAMILYNAME_REQUEST, FAMILYNAME_SUCCESS, FORGOTPASSWORD_FAILURE, FORGOTPASSWORD_REQUEST, FORGOTPASSWORD_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RELIGION_FAILURE, RELIGION_REQUEST, RELIGION_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../Constants"

const registerRequest = () => ({ type: REGISTER_REQUEST })
const registerSuccess = posts => ({
    type: REGISTER_SUCCESS,
    payload: posts,
})
const registerFailure = error => ({
    type: REGISTER_FAILURE,
    payload: error,
    error: true,
})
export const registerUser = (register) => {
    return async (dispatch) => {
        dispatch(registerRequest())
        axios(Api.register, header("POST", register))
            .then((response) => {
                dispatch(registerSuccess(response.data))
            })
            .catch((error) => {
                dispatch(registerFailure(error))
            })
    }
}

const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST })
const resetPasswordSuccess = posts => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: posts,
})
const resetPasswordFailure = error => ({
    type: RESET_PASSWORD_FAILURE,
    payload: error,
    error: true,
})
export const resetPassword = (request) => {
    return async (dispatch) => {
        dispatch(resetPasswordRequest())
        axios(Api.resetPasswordURL, header("POST", request))
            .then((response) => {
                dispatch(resetPasswordSuccess(response.data))
            })
            .catch((error) => {
                dispatch(resetPasswordFailure(error))
            })
    }
}


const loginRequest = () => ({ type: LOGIN_REQUEST })

const loginSuccess = posts => ({
    type: LOGIN_SUCCESS,
    payload: posts,
})

const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: error,
    error: true,
})
export const loginUser = (user) => {
    return async (dispatch) => {
        dispatch(loginRequest())
        axios(Api.login, header("POST", user))
            .then((response) => {
                dispatch(loginSuccess(response.data))
            })
            .catch((error) => {
                dispatch(loginFailure(error))
            })
    }
}


const forgetPasswordRequest = () => ({ type: FORGOTPASSWORD_REQUEST })

const forgetPasswordSuccess = response => ({
    type: FORGOTPASSWORD_SUCCESS,
    payload: response,
})

const forgetPasswordFailure = error => ({
    type: FORGOTPASSWORD_FAILURE,
    payload: error,
    error: true,
})
export const forgetPassword = (email) => {
    console.log(Api, "ApiApiApi");
    return async (dispatch) => {
        dispatch(forgetPasswordRequest())
        axios(Api.forgetPassword, header("POST", email))
            .then((response) => {
                dispatch(forgetPasswordSuccess(response.data))
            })
            .catch((error) => {
                dispatch(forgetPasswordFailure(error))
            })
    }
}

const religionsRequest = () => ({ type: RELIGION_REQUEST })

const religionsSuccess = data => ({
    type: RELIGION_SUCCESS,
    payload: data,
}
)

const religionsFailure = error => ({
    type: RELIGION_FAILURE,
    payload: error,
    error: true,
})
export const getReligion = () => {
    return async (dispatch) => {
        dispatch(religionsRequest())
        axios.get(Api.religions)
            .then((response) => {
                dispatch(religionsSuccess(response.data))
            })
            .catch((error) => {
                dispatch(religionsFailure(error))
            })
    }
}

const communitiesRequest = () => ({ type: COMMUNITIES_REQUEST })

const communitiesSuccess = data => ({
    type: COMMUNITIES_SUCCESS,
    payload: data,
}
)

const communitiesFailure = error => ({
    type: COMMUNITIES_FAILURE,
    payload: error,
    error: true,
})
export const getCommunities = (id) => {
    return async (dispatch) => {
        dispatch(communitiesRequest())
        axios.get(Api.community(id))
            .then((response) => {
                dispatch(communitiesSuccess(response.data))
            })
            .catch((error) => {
                dispatch(communitiesFailure(error))
            })
    }
}

const familyNameRequest = () => ({ type: FAMILYNAME_REQUEST })

const familyNameSuccess = data => ({
    type: FAMILYNAME_SUCCESS,
    payload: data,
})

const familyNameFailure = error => ({
    type: FAMILYNAME_FAILURE,
    payload: error,
    error: true,
})
export const getFamilyNames = (id) => {
    return async (dispatch) => {
        dispatch(familyNameRequest())
        axios.get(Api.familyNames(id))
            .then((response) => {
                dispatch(familyNameSuccess(response.data))
            })
            .catch((error) => {
                dispatch(familyNameFailure(error))
            })
    }
}

// AI Chat Bot
const aiChatRequest = () => ({ type: AI_MESSAGE_REQUEST })

const aiChatSuccess = response => ({
    type: AI_MESSAGE_SUCCESS,
    payload: response,
})

const aiChatFailure = error => ({
    type: AI_MESSAGE_FAILURE,
    payload: error,
    error: true,
})
export const aiChatMessage = (message) => {
    const req = { message: message };
    return async (dispatch) => {
        dispatch(aiChatRequest())
        axios(Api.AIMessageAPI, header("POST", req))
            .then((response) => {
                dispatch(aiChatSuccess(response.data))
            })
            .catch((error) => {
                dispatch(aiChatFailure(error))
            })
    }
}

