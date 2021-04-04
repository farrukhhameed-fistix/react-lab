import { useReducer, useState } from "react";
import { ITaskModel } from "../Models/ITaskModel";
import { IManageTaskState } from "./IManageTaskState";

interface IAction{
    Type: string;
    Payload: any
}

function reducer(state:IManageTaskState, action:IAction):IManageTaskState{

    switch (action.Type){
        case "SET_TASKS":
            let tasks:ITaskModel[] = [...action.Payload.Tasks];
            
            return {...state, Tasks:[...tasks]};          
                    
        case "GET_ALL_TASKS_API_START":
            return {...state, GetApiCallInprogress: true, GetApiCallError: ''};

        case "GET_ALL_TASKS_API_COMPLETE":
            return {...state, GetApiCallInprogress: false};
        
        case "GET_ALL_TASKS_API_ERROR":
            return {...state, GetApiCallError: action.Payload};

        
        
        case "DELETE_TASK":
            let index = state.Tasks.findIndex(x=>x.id == action.Payload);
            if(index > -1){
                var taskCopy = [...state.Tasks];
                taskCopy.splice(index,1)

                return{...state, Tasks:[...taskCopy]};
            }
            return state;

        case "DELETE_TASK_API_START":
            return {...state, DeleteApiCallInprogress: true, DeleteApiCallError: '', DeleteApiCallTaskId: action.Payload};

        case "DELETE_TASK_API_COMPLETE":
            return {...state, DeleteApiCallInprogress: false, DeleteApiCallTaskId: action.Payload};
        
        case "DELETE_TASK_API_ERROR":
            return {...state, DeleteApiCallError: action.Payload.Error, DeleteApiCallTaskId: action.Payload.TaskId};       




        case "CREATE_TASK":
            let task:ITaskModel = {...action.Payload};
            
            return {...state, Tasks:[...state.Tasks,task]};              
    
        case "CREATE_TASK_API_START":
            return {...state, SaveApiCallInprogress: true, SaveApiCallError: ''};

        case "CREATE_TASK_API_COMPLETE":
            return {...state, SaveApiCallInprogress: false};
        
        case "CREATE_TASK_API_ERROR":
            return {...state, SaveApiCallError: action.Payload};        

        default:
            return state;
    }
}


function useTaskStore(initState:ITaskModel[]):[ITaskModel[],(task:ITaskModel)=>void, (id:string)=>void]{    

    const [tasks,setTasks] = useState<ITaskModel[]>(initState);

    const add = (task:ITaskModel) => {
        task.id = (tasks.length + 1).toString();
        setTasks([...tasks,task]);
    }

    const remove = (taskId:string) => {
        var index = tasks.findIndex(x=>x.id == taskId);
        if(index > -1){
            var taskCopy = [...tasks];
            taskCopy.splice(index,1)
            setTasks([...taskCopy]);
        }
    }

    return [tasks, add, remove];    
}

export function useTaskState(initState:IManageTaskState):[IManageTaskState,(action:IAction)=>void]{    
    console.log('UseTask hook' , new Date().toISOString())
    const[state, dispatch] = useReducer(reducer,initState);

    const add = (task:ITaskModel) => {
        dispatch({Type:'CREATE_TASK', Payload:task});
    }

    const remove = (taskId:string) => {
        dispatch({Type:'DELETE_TASK', Payload:taskId});
    }

    return [state, dispatch];    
}
 