import { ITaskModel } from "../Models/ITaskModel";

export interface IManageTaskState {
    Tasks: ITaskModel[];
    
    GetApiCallInprogress: boolean;
    GetApiCallError: string;

    SaveApiCallError: string;    
    SaveApiCallInprogress: boolean;
    
    DeleteApiCallInprogress: boolean;
    DeleteApiCallError: string;
    DeleteApiCallTaskId: string;
}
