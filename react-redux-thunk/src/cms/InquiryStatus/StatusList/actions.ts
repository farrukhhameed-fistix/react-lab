import { action } from "typesafe-actions";
import { InquiryStatusModel } from "./InquiryStatusModel";


export enum StatusListActionTypes {
  FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED = "@@InquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED",
  FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED = "@@InquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED",
  FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED = "@@InquiryStatus/FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED",
  ADD_INQUIRY_STATUS_TO_LIST = "@@InquiryStatus/ADD_INQUIRY_STATUS_TO_LIST"
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

interface AddInquiryStatsToList {
  type: typeof StatusListActionTypes.ADD_INQUIRY_STATUS_TO_LIST,
  payload: InquiryStatusModel
}

export type StatusListActionCreatorTypes =
  | FetchListRequestStarted
  | FetchListRequestSucceed 
  | FetchListRequestFailed
  | AddInquiryStatsToList;

export const FetchListRequestStarted = () : FetchListRequestStarted => ({
  type: StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_STARTED
});

export const FetchListRequestSucceed = (data: Array<InquiryStatusModel>): FetchListRequestSucceed =>
  action(StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_SUCCEED, data);

export const FetchListRequestFailed = (message: string): FetchListRequestFailed =>
  action(StatusListActionTypes.FETCH_INQUIRY_STATUS_LIST_REQUEST_FAILED, message);

export const AddInquiryStatusToList = (payload: InquiryStatusModel) : AddInquiryStatsToList => 
 action(StatusListActionTypes.ADD_INQUIRY_STATUS_TO_LIST, payload);
