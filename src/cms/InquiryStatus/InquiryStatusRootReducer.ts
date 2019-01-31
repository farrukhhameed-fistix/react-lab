import { statusListReducer } from "./StatusList/reducer";
import { createStatusReducer } from "./CreateStatus/reducer";
import { combineReducers } from "redux";

export const inquiryStatusRootReducer = combineReducers({  
    inquiryStatusList: statusListReducer,
    createStatus: createStatusReducer
});
