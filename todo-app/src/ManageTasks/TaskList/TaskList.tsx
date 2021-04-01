import { memo, useCallback } from 'react';
import { ITaskModel } from '../Models/ITaskModel';
import DeleteTask from './DeleteTask';
import TaskListItem from './TaskListItem'

interface ITaskListProp {
    Tasks: ITaskModel[];
    OnDelete: (id:string)=>void;
}

const TaskList = ({Tasks, OnDelete}:ITaskListProp) =>{
    console.log('Task List' , new Date().toISOString());
    
    //const Remove = useCallback(OnDelete,[]);

    return <div>
    {
        Tasks && Tasks.map((task:ITaskModel) =>
        <>
            <TaskListItem key={task.id} Task={task} />
            <DeleteTask TaskId={task.id} OnDelete={OnDelete} />
        </>)
    }
    </div>
}
export default memo(TaskList)