import { AUTH, SOCIAL } from "../constants/actionTypes"
import * as api from "../api"

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)
    // console.log("data", data)
    dispatch({ type: AUTH, data })

    router.push("/")
  } catch (error) {
    console.log(error)
  }
}

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)

    dispatch({ type: AUTH, data })

    router.push("/")
  } catch (error) {
    console.log(error)
  }
}
export const social = (formData) => async (dispatch) => {
  console.log(formData)
  try {
    const { data } = await api.social(formData)

    dispatch({ type: SOCIAL, data })

    // router.push("/")
  } catch (error) {
    console.log(error)
  }
}
