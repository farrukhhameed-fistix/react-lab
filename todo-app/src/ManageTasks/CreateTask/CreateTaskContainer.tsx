import { useContext } from "react"
import { ITaskModel } from "../Models/ITaskModel";
import useTaskActions from "../Provider/TaskActions";
import { TaskContext } from "../Provider/TaskContext";
import {CreateTask} from "./CreateTask"

export const CreateTaskContainer = () =>
{
    const {State, Dispatch} = useContext(TaskContext);
    const [SaveTask] = useTaskActions(Dispatch);

    const Add = (task:ITaskModel) => {
        SaveTask(task);
        //Dispatch({Type:"CREATE_TASK", Payload: task});
    }

    return <CreateTask 
        SaveApiCallInprogress={State.SaveApiCallInprogress} 
        SaveApiCallError={State.SaveApiCallError} 
        OnSave={Add} 
    />
}