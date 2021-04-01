import { useContext } from "react"
import { ITaskModel } from "../Models/ITaskModel";
import { TaskContext } from "../Provider/TaskContext";
import {CreateTask} from "./CreateTask"

export const CreateTaskContainer = () =>
{
    const {Dispatch} = useContext(TaskContext);

    const Add = (task:ITaskModel) => {
        Dispatch({Type:"CREATE_TASK", Payload: task});
    }

    return <CreateTask OnSave={Add} />
}