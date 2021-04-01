import TaskListContainer from "./TaskListContainer";

export function TaskListPage(){
    console.log('Task List Page' , new Date().toISOString())
    return(
        <>
            <h1>Page</h1>
            <TaskListContainer/>
        </>
    );
}