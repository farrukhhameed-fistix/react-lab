import { memo } from "react"

interface IDeleteTaskProp{
    TaskId: string;
    OnDelete: (id:string)=>void;
    DeleteApiCallInprogress: boolean
    DeleteApiCallError: string
    DeleteApiCallTaskId: string
}

const areEqual = (prevProps: IDeleteTaskProp, nextProps: IDeleteTaskProp):boolean => {
    return prevProps.TaskId == nextProps.TaskId;
}

const DeleteTask = ({TaskId, DeleteApiCallInprogress, DeleteApiCallError, DeleteApiCallTaskId, OnDelete}: IDeleteTaskProp) => {
    console.log('Delete Task' , new Date().toISOString())
    return<> 
        <button onClick={() => OnDelete(TaskId)}>Delete</button>
        {DeleteApiCallInprogress && TaskId === DeleteApiCallTaskId && " .... deleting ...."} 
        {DeleteApiCallError && <div>{DeleteApiCallError}</div>}
    </> 
}


export  default memo (DeleteTask)