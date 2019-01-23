import { InquiryStatusModel } from "./InquiryStatusModel";

export interface StatusListState{
    readonly statuses: InquiryStatusModel[]
    readonly loading: boolean
    readonly error?: string
}

export const inItStatusListState: StatusListState = {
    statuses: [],
    error: undefined,
    loading: false
  };