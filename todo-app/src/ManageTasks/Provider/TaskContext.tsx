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

export const TaskContext = React.createContext<ITaskContextType>({State:{Tasks:[]}, Dispatch:()=>{}});