import React from "react";
import { TaskContext } from "./TaskContext"
import { useTaskState } from "./TaskStore"

export interface ITaskProviderProps {
    children: React.ReactNode;
}

export const TaskProvider = ({children}:ITaskProviderProps) => {    
    console.log('Task provider' , new Date().toISOString())
    const initTaskState = {
        Tasks:[]
    }
    const [TaskState, Dispatch] = useTaskState(initTaskState);    

    return <TaskContext.Provider value={{State:TaskState, Dispatch}}>
        {children}
    </TaskContext.Provider>

}