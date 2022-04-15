import { Task } from '../Task/Task';

export function TasksList(props) {
  return(
    <ul className='tasksList'>
      {props.tasks.map((task) => (
        <Task 
        key = {task.id}
        username = {task.username}
        email = {task.email}
        text = {task.text}
        status = {task.status} />
      ))}
    </ul>
  )
};