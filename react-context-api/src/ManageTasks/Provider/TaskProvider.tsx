import React from "react";
import { ITaskContextType } from "./TaskContext";
import { TaskContext } from "./TaskContext"
import { useTaskState } from "./TaskStore"

export interface ITaskProviderProps {
    children: React.ReactNode;
}

export const TaskProvider = ({children}:ITaskProviderProps) => {    
    console.log('Task provider' , new Date().toISOString())
    const initTaskState = {
        Tasks:[],
        GetApiCallError: '',
        GetApiCallInprogress: false,
        SaveApiCallInprogress: false,
        SaveApiCallError: '',
        DeleteApiCallError: '',    
        DeleteApiCallInprogress: false,    
        DeleteApiCallTaskId:''
    }

    const [TaskState, Dispatch] = useTaskState(initTaskState);    

    return <TaskContext.Provider value={{State:TaskState, Dispatch}}>
        {children}
    </TaskContext.Provider>

}