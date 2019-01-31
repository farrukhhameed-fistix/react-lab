import { action } from "typesafe-actions";
import { InquiryStatusModel } from "./InquiryStatusModel";


export enum StatusListActionTypes {
  FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED = "@@CustomInquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED",
  FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED = "@@CustomInquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED",
  FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED = "@@CustomInquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED"
}

interface FetchListRequestStarted {
  type: typeof StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED;
}

interface FetchListRequestSucceed {
  type: typeof StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED;
  payload: InquiryStatusModel[];
}

interface FetchListRequestFailed {
  type: typeof StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED;
  payload: string;
}

export type StatusListActionCreatorTypes =
  | FetchListRequestStarted
  | FetchListRequestSucceed 
  | FetchListRequestFailed;

export const FetchListRequestStarted = () : FetchListRequestStarted => ({
  type: StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED
});

export const FetchListRequestSucceed = (data: Array<InquiryStatusModel>): FetchListRequestSucceed =>
  action(StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED, data);

export const FetchListRequestFailed = (message: string): FetchListRequestFailed =>
  action(
    StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED,
    message
  );