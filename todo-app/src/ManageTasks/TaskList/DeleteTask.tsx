import { memo } from "react"

interface IDeleteTaskProp{
    TaskId: string;
    OnDelete: (id:string)=>void;
}

const areEqual = (prevProps: IDeleteTaskProp, nextProps: IDeleteTaskProp):boolean => {
    return prevProps.TaskId == nextProps.TaskId;
}

const DeleteTask = ({TaskId, OnDelete}: IDeleteTaskProp) => {
    console.log('Delete Task' , new Date().toISOString())
    return <button onClick={() => OnDelete(TaskId)}>Delete</button>
}


export  default memo (DeleteTask)