import { ITaskModel } from "../Models/ITaskModel"

interface ICreateTaskProp{
    OnSave: (task:ITaskModel)=>void
}

export const CreateTask  = ({OnSave}:ICreateTaskProp) => {
    return <div>
        <button onClick={()=>{
            console.log('clicked');
            OnSave({id:'', title:'test task', description: 'its another test task'});

        }}>Save</button>
    </div>

}