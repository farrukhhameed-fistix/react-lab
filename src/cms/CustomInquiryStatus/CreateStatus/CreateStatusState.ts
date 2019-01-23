import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";

export interface CreateStatusState{
    readonly loading: boolean
    readonly error?: string
}

export const inItCreateStatusState: CreateStatusState = {  
    error: undefined,
    loading: false
  };