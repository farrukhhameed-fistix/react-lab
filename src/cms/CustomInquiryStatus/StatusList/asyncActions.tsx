import { InquiryStatusModel } from "./InquiryStatusModel";

import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { FetchListRequestSucceed } from "./actions";

export const FetchListRequestThunk = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {

    var promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        let statuses = new Array<InquiryStatusModel>();
        statuses.push(new InquiryStatusModel(1, "stats 1", "#123456"));
        statuses.push(new InquiryStatusModel(2, "stats 2", "#123456"));
        statuses.push(new InquiryStatusModel(3, "stats 3", "#123456"));

        dispatch(FetchListRequestSucceed(statuses))
        return resolve();
      }, 5000);
    });

    return promise;   
  };
};
