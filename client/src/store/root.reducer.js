import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { fileReducer } from "./file/file.reducer";

export const rootReducers = combineReducers({
  user: userReducer,
  file: fileReducer,
});
