import * as actionType from "../constants/actionTypes"
import cookie from "js-cookie"

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      console.log("red", action?.data.user)
      cookie.set("token", action?.data.token)
      cookie.set("user", JSON.stringify(action?.data.user))

      return { ...state, authData: action.data, loading: false, errors: null }
    case actionType.LOGOUT:
      localStorage.clear()

      return { ...state, authData: null, loading: false, errors: null }
    default:
      return state
  }
}
export const socialReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.SOCIAL:
      // localStorage.setItem("profile", JSON.stringify({ ...action?.data }))
      console.log("social red", action?.data.user)
      cookie.set("token", action?.data.token)
      cookie.set("user", JSON.stringify(action?.data.user))

      return { ...state, authData: action.data, loading: false, errors: null }
    case actionType.LOGOUT:
      localStorage.clear()

      return { ...state, authData: null, loading: false, errors: null }
    default:
      return state
  }
}

export default authReducer
