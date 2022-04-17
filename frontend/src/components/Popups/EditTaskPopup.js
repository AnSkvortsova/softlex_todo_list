import { React, useState } from 'react'

export function EditTaskPopup(props) {
  const [text, setTextState] = useState('');
  const [status, setStatusState] = useState('');

  function handleTextInputChange(evt) {
    setTextState(evt.target.value);
  };

  function handleStatusInputChange(evt) {
    setStatusState(evt.target.value);
  };

  function handleSubmitBtn(evt) {
    evt.preventDefault();
    
    props.editTask({
      id: props.oldTask.id, 
      username: props.oldTask.username,
      email: props.oldTask.email,
      text: text === '' ? props.oldTask.text : text, 
      status: status === '' ? props.oldTask.status : status
    });

    setTextState('');
    setStatusState('');
    props.closePopup();
  };

  return(
    <form className={`popup ${props.isPopupOpend ? 'popup_opend' : ''}`}>
      <textarea 
        className='popup__textarea' 
        rows='10' 
        cols='45' 
        type='text' 
        value = {text}
        onChange = {handleTextInputChange}
        placeholder={props.oldTask.text}
        required />
      
      <input 
        className='popup__input' 
        type='text' 
        value = {status}
        onChange = {handleStatusInputChange}
        placeholder={props.oldTask.status}
        required />

      <button className='popup__btn' type='submit' onClick={handleSubmitBtn} aria-label='Отправить'>Отправить</button>
    </form>
  )
};