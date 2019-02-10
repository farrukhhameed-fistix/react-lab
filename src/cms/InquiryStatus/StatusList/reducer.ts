import { Reducer } from "redux";
import { StatusListState, inItStatusListState } from "./StatusListState";
import * as actionTypes from "./actions";
import { stat } from "fs";


const reducer: Reducer<StatusListState> = (state = inItStatusListState, action: actionTypes.StatusListActionCreatorTypes) => {
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
    default: {
      return state;
    }
  }
};

export {reducer as statusListReducer}
