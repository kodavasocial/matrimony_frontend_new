import { setLocalStorage } from "../../Utils/LocalStorage";
import {
  AI_MESSAGE_FAILURE,
  AI_MESSAGE_REQUEST,
  AI_MESSAGE_SUCCESS,
  COMMUNITIES_FAILURE,
  COMMUNITIES_REQUEST,
  COMMUNITIES_SUCCESS,
  FAMILYNAME_FAILURE,
  FAMILYNAME_REQUEST,
  FAMILYNAME_SUCCESS,
  FORGOTPASSWORD_FAILURE,
  FORGOTPASSWORD_REQUEST,
  FORGOTPASSWORD_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RELIGION_FAILURE,
  RELIGION_REQUEST,
  RELIGION_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "../Constants";

let initialState = {
  registrationRequest: "",
  registerLoading: false,
  resetPasswordRequest: "",
  resetPasswordLoading: false,
  loginRequest: "",
  loginLoading: false,
  religionData: "",
  religionLoading: false,
  forgetPasswordRes: "",
  forgetPasswordloading: false,
  communitiesData: [],
  communitiesDataloading: false,
  familyNameData: [],
  familyNameDataLoading: false,
  aiMessageData: {},
  aiMessageLoading: false,
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registerLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registrationRequest: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerLoading: false,
        registrationRequest: action.payload,
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordLoading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordRequest: action.payload,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordRequest: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginRequest: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginRequest: action.payload,
      };
    case RELIGION_REQUEST:
      return {
        ...state,
        religionLoading: true,
      };
    case RELIGION_SUCCESS:
      return {
        ...state,
        religionLoading: false,
        religionData: action.payload,
      };
    case RELIGION_FAILURE:
      return {
        ...state,
        religionLoading: false,
        religionData: action.payload,
      };
    case FORGOTPASSWORD_REQUEST:
      return {
        ...state,
        forgetPasswordloading: true,
      };
    case FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        forgetPasswordloading: false,
        forgetPasswordRes: action.payload,
      };
    case FORGOTPASSWORD_FAILURE:
      return {
        ...state,
        forgetPasswordloading: false,
        forgetPasswordRes: action.payload,
      };
    case COMMUNITIES_REQUEST:
      return {
        ...state,
        communitiesDataloading: true,
      };
    case COMMUNITIES_SUCCESS:
      return {
        ...state,
        communitiesDataloading: false,
        communitiesData: [...action.payload],
      };
    case COMMUNITIES_FAILURE:
      return {
        ...state,
        communitiesDataloading: false,
        communitiesData: action.payload,
      };
    case FAMILYNAME_REQUEST:
      return {
        ...state,
        familyNameDataLoading: true,
      };
    case FAMILYNAME_SUCCESS:
      return {
        ...state,
        familyNameDataLoading: false,
        familyNameData: [...action.payload],
      };
    case FAMILYNAME_FAILURE:
      return {
        ...state,
        familyNameDataLoading: false,
        familyNameData: action.payload,
      };
    case AI_MESSAGE_REQUEST:
      return {
        ...state,
        aiMessageLoading: true,
      };
    case AI_MESSAGE_SUCCESS:
      return {
        ...state,
        aiMessageLoading: false,
        aiMessageData: action.payload,
      };
    case AI_MESSAGE_FAILURE:
      return {
        ...state,
        aiMessageLoading: false,
        aiMessageData: action.payload,
      };
    default:
      return state;
  }
};
export { AuthReducer };
