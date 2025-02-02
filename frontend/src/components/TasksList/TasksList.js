import { Task } from '../Task/Task';

export function TasksList(props) {
  
  return(
    <ul className='tasksList'>
      {props.tasks.map((task) => (
        <Task 
        key = {task.id}
        id = {task.id}
        username = {task.username}
        email = {task.email}
        text = {task.text}
        status = {task.status}
        isLoggedIn = {props.isLoggedIn}
        onEditBtn = {props.onEditBtn} />
      ))}
    </ul>
  )
};