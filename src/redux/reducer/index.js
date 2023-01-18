import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import loanCategoryReducer from "./loanCategoryReducer";

const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
  LoanCategory: loanCategoryReducer,
});

export default rootReducer;
