import { action } from "typesafe-actions";
import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";

export enum CreateStatusActionTypes {
  CREATE_INQUIRY_STATUS_REQUEST = "@@CustomInquiryStatus/CREATE_INQUIRY_STATUS_REQUEST",
  CREATE_INQUIRY_STATUS_REQUEST_SUCCEED = "@@CustomInquiryStatus/CREATE_INQUIRY_STATUS_REQUEST_SUCCEED",
  CREATE_INQUIRY_STATUS_REQUEST_FAILED = "@@CustomInquiryStatus/CREATE_INQUIRY_STATUS_REQUEST_FAILED"
}

export const CreateRequestAction = (model: InquiryStatusModel) => ({
  action: CreateStatusActionTypes.CREATE_INQUIRY_STATUS_REQUEST,
  payload: model
});

export const CreateRequestSucceed = (data: InquiryStatusModel) =>
  action(CreateStatusActionTypes.CREATE_INQUIRY_STATUS_REQUEST_SUCCEED, data);

export const CreateRequestFailed = (message: string) =>
  action(
    CreateStatusActionTypes.CREATE_INQUIRY_STATUS_REQUEST_FAILED,
    message
  );
