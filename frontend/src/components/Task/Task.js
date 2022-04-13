export function Task(props) {
  return(
    <li className='task'>
      <p className='task__text'>{props.text}</p>
      <div className='task__info'>
        <p className='task__data'>name: {props.username}</p>
        <p className='task__data'>email: {props.email}</p>
        <p className='task__data'>status: {props.status}</p>
      </div>
    </li>
  )
};