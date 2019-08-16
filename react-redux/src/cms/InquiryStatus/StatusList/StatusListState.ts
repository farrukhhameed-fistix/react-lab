import { InquiryStatusModel } from "./InquiryStatusModel";

export interface StatusListState{
    readonly statuses: InquiryStatusModel[]
    readonly loading: boolean
    readonly errors: string[]
}

export const inItStatusListState: StatusListState = {
    statuses: [],
    errors: [],
    loading: false
  };