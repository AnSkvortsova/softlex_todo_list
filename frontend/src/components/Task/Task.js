export function Task(props) {
  function handleEditBtn() {
    props.onEditBtn({
      id: props.id, 
      username: props.username,
      email: props.email,
      text: props.text, 
      status: props.status
    });
  };

  return(
    <li className='task'>
      <p className='task__text'>{props.text}</p>
      <div className='task__info'>
        <p className='task__data'>name: {props.username}</p>
        <p className='task__data'>email: {props.email}</p>
        <p className='task__data'>status: {props.status}</p>
        {props.isLoggedIn ? <button className='task__edit' type='button' onClick={handleEditBtn}></button> : null}
      </div>
    </li>
  )
};