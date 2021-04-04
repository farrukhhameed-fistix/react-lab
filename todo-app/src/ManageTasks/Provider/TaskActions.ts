import { ITaskModel } from "../Models/ITaskModel";
import { IAction } from "./IAction";

export default function useTaskActions(Dispatch:((action:IAction)=>void)):[(task:ITaskModel)=>Promise<void>,(taskId:string)=>Promise<void>, ()=>Promise<void>]{

    const SaveTask = async (task:ITaskModel) => {

        Dispatch({Type:"CREATE_TASK_API_START", Payload: null});
        try {
            var newTask = await PostTask(task);    
            Dispatch({Type:"CREATE_TASK", Payload: newTask});

        } catch (ex) {
            console.log(ex);
            Dispatch({Type:"CREATE_TASK_API_ERROR", Payload: 'some error occured while saving task'});
        }
        finally{
            Dispatch({Type:"CREATE_TASK_API_COMPLETE", Payload: null});
        }
        
    }

    const RemoveTask = async (taskId:string) => {

        Dispatch({Type:"DELETE_TASK_API_START", Payload: taskId});
        try {
            await DeleteTask(taskId);    
            Dispatch({Type:"DELETE_TASK", Payload: taskId});

        } catch (ex) {
            console.log(ex);
            Dispatch({Type:"DELETE_TASK_API_ERROR", Payload: {Error:'some error occured while saving task', TaskId: taskId}});
        }
        finally{
            Dispatch({Type:"DELETE_TASK_API_COMPLETE", Payload: taskId});
        }
        
    }

    const GetAllTasks = async () => {

        Dispatch({Type:"GET_ALL_TASKS_API_START", Payload: null});
        try {
            var tasks = await GetTask();
            Dispatch({Type:"SET_TASKS", Payload: {Tasks:tasks}});

        } catch (ex) {
            console.log(ex);
            Dispatch({Type:"GET_ALL_TASKS_API_ERROR", Payload: 'some error occured while getting all tasks'});
        }
        finally{
            Dispatch({Type:"GET_ALL_TASKS_API_COMPLETE", Payload: null});
        }
        
    }

    let PostTask = (task:ITaskModel) => {

        return new Promise<ITaskModel>((reslove, reject) => {
            setTimeout(()=>{

                task.id = new Date().toISOString();                        
                reslove(task);
            }, 3000);
        });
    }

    let DeleteTask = (taskId:string) => {

        return new Promise<boolean>((reslove, reject) => {

            setTimeout(()=>{            
                reslove(true);
            }, 3000);
        });
    }

    let GetTask = () => {

        return new Promise<ITaskModel[]>((reslove, reject) => {
            setTimeout(()=>{
                var tasks = []
                tasks.push(
                    {
                        id: `${new Date().toISOString()}1`,                    
                        title: "Task1",
                        description: "its first task",
                    });
                tasks.push(
                    {
                        id: `${new Date().toISOString()}2`,                    
                        title: "Task2",
                        description: "its second task",
                    });
                reslove(tasks);
            }, 3000);
        });
    }

    return [SaveTask, RemoveTask, GetAllTasks]
}

