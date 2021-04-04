import { memo, useCallback } from 'react';
import { ITaskModel } from '../Models/ITaskModel';
import DeleteTask from './DeleteTask';
import TaskListItem from './TaskListItem'

interface ITaskListProp {
    Tasks: ITaskModel[];
    OnDelete: (id:string)=>void;
    ApiCallInprogress: boolean;
    DeleteApiCallInprogress: boolean;
    DeleteApiCallError: string;
    DeleteApiCallTaskId: string;
}

const TaskList = ({Tasks, ApiCallInprogress, DeleteApiCallInprogress, DeleteApiCallError, DeleteApiCallTaskId, OnDelete}:ITaskListProp) =>{
    console.log('Task List' , new Date().toISOString());
    
    //const Remove = useCallback(OnDelete,[]);

    return ( 
    <div>
        <h1>Tasks</h1>
        {
            ApiCallInprogress && "loading ......"
        }
        {                
            Tasks && Tasks.map((task:ITaskModel) =>
            <div key={task.id}>
                <TaskListItem Task={task} />
                <DeleteTask 
                    TaskId={task.id}
                    DeleteApiCallInprogress={DeleteApiCallInprogress}
                    DeleteApiCallError={DeleteApiCallError} 
                    DeleteApiCallTaskId={DeleteApiCallTaskId}
                    OnDelete={OnDelete} 
                />
                <hr/>
            </div>)
        }
    </div>)
}
export default memo(TaskList)