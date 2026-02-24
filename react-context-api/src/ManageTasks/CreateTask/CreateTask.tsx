import { ITaskModel } from "../Models/ITaskModel"

interface ICreateTaskProp{
    OnSave: (task:ITaskModel)=>void
    SaveApiCallInprogress: boolean
    SaveApiCallError: string
}

export const CreateTask  = ({OnSave, SaveApiCallInprogress, SaveApiCallError}:ICreateTaskProp) => {
    return <div>
        <button onClick={()=>{
            console.log('clicked');
            OnSave({id:'', title:'test task', description: 'its another test task'});

        }}>Create New Task</button>
        {SaveApiCallInprogress && " .... saving ...."} 
        {SaveApiCallError && <div>SaveApiCallError</div>} 
    </div>

}