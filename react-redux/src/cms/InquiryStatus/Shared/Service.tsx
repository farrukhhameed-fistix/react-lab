import AppStore from "../../../configureStore";
import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";
import { fetchStatusById } from "./ApiGateway";
import ApiResult from "./ApiResult";

export function getStatusById(id: number): Promise<ApiResult> {
  let promise: Promise<ApiResult> = new Promise<ApiResult>(
    (reslove, reject) => {
      let status = AppStore.getState().InquiryStatus.inquiryStatusList.statuses.find(
        x => x.id == id
      );

      if (status == null) {
        return fetchStatusById(id);
      } else {
        reslove({ isSucceed: true, object: status });
      }
    }
  );

  return promise;
}
