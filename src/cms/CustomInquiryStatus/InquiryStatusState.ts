import { StatusListState, inItStatusListState } from "./StatusList/StatusListState";
import { CreateStatusState, inItCreateStatusState } from "./CreateStatus/CreateStatusState";

export interface InquiryStatusState {
    inquiryStatusList: StatusListState;
    createStatus: CreateStatusState;
  }
  

  export const inItInquiryStatusState:InquiryStatusState = {
    inquiryStatusList: inItStatusListState,
    createStatus: inItCreateStatusState
  }