import { InquiryStatusModel } from "./StatusList/InquiryStatusModel";
import ApiResult from "./ApiResult";
import random from 'random';


export function saveNewInquiryStatus(statusModel: InquiryStatusModel): Promise<ApiResult> {
    let promise: Promise<ApiResult> = new Promise<ApiResult>((reslove, reject) => {
        setTimeout(() => {
            reslove({ isSucceed: true, object: {...statusModel, id: random.int(1,100)}})
        }, 2000);
    });

    return promise;
}

export function getStatusByTitle(title: string): Promise<ApiResult> {
    let promise: Promise<ApiResult> = new Promise<ApiResult>((reslove, reject) => {
        setTimeout(() => {
            reslove({ isSucceed: true })
        }, 2000);
    });

    return promise;
}
