import { useCallback, useContext, useState } from "react";
import { TaskContext } from "../Provider/TaskContext";
import TaskList from "./TaskList";

const TaskListContainer = () => {
    console.log('Task List Container' , new Date().toISOString())

    const {State, Dispatch} = useContext(TaskContext)
    const [count, SetCount] = useState('');

    
    const Remove = useCallback(
        (taskId:string) =>{
        Dispatch({Type: "DELETE_TASK", Payload:taskId});
    },[]);

    return <>
        <h2>Container</h2>
        <input  type="text" value={count} onChange={(e)=>SetCount(e.target.value)} />
        <TaskList Tasks={State.Tasks} OnDelete={Remove} />        
    </>
}

export default TaskListContainer