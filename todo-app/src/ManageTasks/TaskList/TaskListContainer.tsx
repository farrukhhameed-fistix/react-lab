import { useCallback, useContext, useEffect, useState } from "react";
import useTaskActions from "../Provider/TaskActions";
import { TaskContext } from "../Provider/TaskContext";
import TaskList from "./TaskList";

const TaskListContainer = () => {
    console.log('Task List Container' , new Date().toISOString())

    const {State, Dispatch} = useContext(TaskContext)
    const [count, SetCount] = useState('');
    const [SaveTask, RemoveTask, GetAllTasks] = useTaskActions(Dispatch);

    useEffect(()=>{
        GetAllTasks();
    }, []);

    const Remove = useCallback(
        (taskId:string) =>{
        //Dispatch({Type: "DELETE_TASK", Payload:taskId});
        RemoveTask(taskId);
    },[]);

    return <>
        <h2>Container</h2>
        <input  type="text" value={count} onChange={(e)=>SetCount(e.target.value)} />
        <hr/>
        <TaskList              
            Tasks={State.Tasks}
            ApiCallInprogress={State.GetApiCallInprogress}
            DeleteApiCallInprogress={State.DeleteApiCallInprogress}
            DeleteApiCallError={State.DeleteApiCallError} 
            DeleteApiCallTaskId={State.DeleteApiCallTaskId}
            OnDelete={Remove} 
        />        
    </>
}

export default TaskListContainer