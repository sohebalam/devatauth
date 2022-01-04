import { combineReducers } from "redux"
import { authReducer, socialReducer } from "./reducers/auth"

const reducer = combineReducers({
  auth: authReducer,
  social: socialReducer,

  //instructor
})

export default reducer
