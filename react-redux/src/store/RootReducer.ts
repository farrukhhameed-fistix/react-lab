import { combineReducers } from "redux";
import { ApplicationState } from "./ApplicationState";
import { inquiryStatusRootReducer } from "../cms/InquiryStatus";
import { heroesRootReducer } from "../cms/heroes/heroesRootReducer";

export const rootReducer = combineReducers<ApplicationState>({
    InquiryStatus: inquiryStatusRootReducer,
    HeroesState: heroesRootReducer
});
