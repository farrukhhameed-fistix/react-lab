import { send } from "process";
import { memo, useState } from "react";
import { ITaskModel } from "../Models/ITaskModel";

interface ITaskListItemProp {
    Task: ITaskModel
}

function TaskListItem({Task}:ITaskListItemProp){
    const [title,setTittle] = useState(Task.title);

    console.log('Task List Item' , new Date().toISOString())
    return(
    <div>
        <div><span>{Task.id}</span>-<span>{Task.title}</span></div>
        <span>{Task.description}</span>
        <input type="text" value={title} onChange={(e)=>setTittle(e.target.value)} />
    </div>
    )
}

export default memo(TaskListItem);
