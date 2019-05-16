import { statusListReducer } from "../StatusList/reducer";
import { combineReducers } from "redux";

export const inquiryStatusRootReducer = combineReducers({  
    inquiryStatusList: statusListReducer    
});
