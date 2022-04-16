export function Buttons(props) {
  function handleSortTaskBtn() {
    props.onSortTaskBtn();
  };

  function handleAddTaskBtn() {
    props.onAddTaskBtn();
  };

  function handleLoginBtn() {
    props.onLoginBtn();
  };

  return(
    <div className='buttons'>
      <button 
        className='buttons__btn' 
        onClick={handleSortTaskBtn} 
        type='button' 
        aria-label='Добавить задачу'>Сортировать задачи</button>

      <button 
        className='buttons__btn' 
        onClick={handleAddTaskBtn} 
        type='button' 
        aria-label='Добавить задачу'>Добавить задачу</button>

      <button 
        className='buttons__btn'
        onClick={handleLoginBtn} 
        type='button' 
        aria-label='Вход'>Вход для администратора</button>
    </div>
  )
};