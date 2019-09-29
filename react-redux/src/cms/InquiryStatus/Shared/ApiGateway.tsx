import { InquiryStatusModel } from "../StatusList/InquiryStatusModel";
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

export function updateInquiryStatus(statusModel: InquiryStatusModel): Promise<ApiResult> {
    let promise: Promise<ApiResult> = new Promise<ApiResult>((reslove, reject) => {
        setTimeout(() => {
            reslove({ isSucceed: true, object: {...statusModel}})
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

export function fetchStatusById(id: number): Promise<ApiResult> {
    let promise: Promise<ApiResult> = new Promise<ApiResult>((reslove, reject) => {
        setTimeout(() => {
            
            let model = new InquiryStatusModel(id,"test", '');
            reslove({ isSucceed: true, object:model });
        }, 2000);
    });

    return promise;
}

export function fetchAllStatuses(): Promise<ApiResult> {
    let promise: Promise<ApiResult> = new Promise<ApiResult>((reslove, reject) => {
        setTimeout(() => {
            
            let model = new Array<InquiryStatusModel>();
            model.push(new InquiryStatusModel(1,"test", ''));
            model.push(new InquiryStatusModel(2,"test2", ''));
            model.push(new InquiryStatusModel(3,"test3", ''));
            
            reslove({ isSucceed: true, object:model});
        }, 2000);
    });

    return promise;
}