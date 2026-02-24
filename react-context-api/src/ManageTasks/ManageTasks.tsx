import { memo } from "react"
import { CreateTaskPage } from "./CreateTask/CreateTaskPage"
import { TaskProvider } from "./Provider/TaskProvider"
import { TaskListPage } from "./TaskList/TaskListPage"

const ManageTasks = () => {
    console.log('Manage task' , new Date().toISOString())
    return <TaskProvider>        
        <TaskListPage/>        
        <CreateTaskPage/>
    </TaskProvider>
}

export default ManageTasks;