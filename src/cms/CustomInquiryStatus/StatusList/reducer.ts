import { Reducer } from "redux";
import { StatusListState, inItStatusListState } from "./StatusListState";
import * as actionTypes from "./actions";



const reducer: Reducer<StatusListState> = (state = inItStatusListState, action: actionTypes.StatusListActionCreatorTypes) => {
  switch (action.type) {
    case actionTypes.StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST: {
       return { ...state, loading: true };      
    }
    case actionTypes.StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED: {
       return { ...state, loading: false, statuses: action.payload };
    }
    case actionTypes.StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export {reducer as statusListReducer}
