import { Reducer } from "redux";
import { CreateStatusState, inItCreateStatusState } from "./CreateStatusState";
import * as actionTypes from "./actions";



const reducer: Reducer<CreateStatusState> = (state = inItCreateStatusState, action) => {
  switch (action.type) {
    case actionTypes.CreateRequestAction: {
       return { ...state, loading: true };
      
    }
    case actionTypes.CreateRequestSucceed: {
       return { ...state, loading: false};
      
    }
    case actionTypes.CreateRequestFailed: {
       return { ...state, loading: false, error: action.payload };
     
    }
    default: {
      return state;
    }
  }
};

export {reducer as createStatusReducer}
