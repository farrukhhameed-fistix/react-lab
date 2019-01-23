import { action } from "typesafe-actions";
import { InquiryStatusModel } from "./InquiryStatusModel";

export enum StatusListActionTypes {
  FETCH_INQUIRY_STATUS_LIST_REQUEST = "@@CustomInquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST",
  FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED = "@@CustomInquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED",
  FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED = "@@CustomInquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED"
}

interface FetchListRequestAction {
  type: typeof StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST  
}

interface FetchListRequestSucceed {
  type: typeof StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED
  payload: InquiryStatusModel[]
}

interface FetchListRequestFailed {
  type: typeof StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED
  payload: string
}

export type StatusListActionCreatorTypes = FetchListRequestAction | FetchListRequestSucceed | FetchListRequestFailed

export const FetchListRequest = () => ({
  type: StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST
});

export const FetchListRequestSucceed = (data: Array<InquiryStatusModel>) =>
  action(StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED, data);

export const FetchListRequestFailed = (message: string) =>
  action(
    StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED,
    message
  );


