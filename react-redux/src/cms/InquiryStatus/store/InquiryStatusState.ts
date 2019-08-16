import { StatusListState, inItStatusListState } from "../StatusList/StatusListState";

export interface InquiryStatusState {
    inquiryStatusList: StatusListState
  }
  

  export const inItInquiryStatusState:InquiryStatusState = {
    inquiryStatusList: inItStatusListState
  }