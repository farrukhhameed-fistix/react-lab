import { Reducer } from "redux";
import { StatusListState, inItStatusListState } from "./StatusListState";
import * as actionTypes from "./actions";
import { stat } from "fs";
import { InquiryStatusModel } from "./InquiryStatusModel";
import { object } from "yup";
import { InquiryStatusState } from "../store/InquiryStatusState";


const reducer: Reducer<StatusListState> = (state:StatusListState = inItStatusListState, action: actionTypes.StatusListActionCreatorTypes) => {
  switch (action.type) {
    case actionTypes.StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED: {      
       return { ...state, loading: state.statuses && state.statuses.length >= 1 ? false : true, errors:[] };      
    }
    case actionTypes.StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED: {
       return { ...state, loading: false, statuses: action.payload, errors:[] };
    }
    case actionTypes.StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED: {
      return { ...state, loading: false, errors: [action.payload] };
    }
    case actionTypes.StatusListActionTypes.ADD_INQUIRY_STATUS_TO_LIST: {      
      return { ...state, statuses: [...state.statuses, action.payload]};
    }
    case actionTypes.StatusListActionTypes.UPDATE_INQUIRY_STATUS_TO_LIST: {
      let statuses = new Array<InquiryStatusModel>(); 
      let index = state.statuses.findIndex(x => x.id == action.payload.id);
      if(index == 0){
        if(state.statuses.length >= 2)
        { 
          statuses = [action.payload, ...state.statuses.slice(1, state.statuses.length)];          
        }
        else{
          statuses = [action.payload];
        }
      }
      else if(index == state.statuses.length-1){         
          statuses = [...state.statuses.slice(0, state.statuses.length-1), action.payload];        
      }
      else if (index > -1){
        statuses = [...state.statuses.slice(0, index), action.payload, ...state.statuses.slice(index+1, state.statuses.length)];
      }
      
      return { ...state, statuses: statuses};
    }
    default: {
      return state;
    }
  }
};

export {reducer as statusListReducer}
