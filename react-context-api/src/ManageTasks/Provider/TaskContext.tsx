import  React from 'react'
import { ITaskModel } from '../Models/ITaskModel';
import { IAction } from './IAction';
import { IManageTaskState } from './IManageTaskState';

export interface ITaskContextType{    
    State: IManageTaskState
    Dispatch: (action:IAction)=>void
    //Add: (task:ITaskModel)=>void
    //Remove: (id:string)=>void
}

const initTaskState:IManageTaskState = {
    Tasks:[],
    GetApiCallError: '',
    GetApiCallInprogress: false,
    SaveApiCallInprogress: false,
    SaveApiCallError: '',
    DeleteApiCallError: '',    
    DeleteApiCallInprogress: false,    
    DeleteApiCallTaskId:''
}

export const TaskContext = React.createContext<ITaskContextType>({State:initTaskState, Dispatch:()=>{}});