import { React, useState } from 'react';

export function AddTaskPopup(props) {
  const [username, setUsernameState] = useState('');
  const [email, setEmailState] = useState('');
  const [text, setTextState] = useState('');

  function handleNameInputChange(evt) {
    setUsernameState(evt.target.value);
  };

  function handleEmailInputChange(evt) {
    setEmailState(evt.target.value);
  };

  function handleTextInputChange(evt) {
    setTextState(evt.target.value);
  };

  function handleSubmitBtn(evt) {
    evt.preventDefault();
    props.addNewTask({
      username,
      email,
      text 
    })
    setUsernameState('');
    setEmailState('');
    setTextState('');
    props.closePopup();
  };

  return(
    <form className={`popup ${props.isPopupOpend ? 'popup_opend' : ''}`}>
      <input 
        className='popup__input' 
        id='name' 
        type='text' 
        value = {username}
        onChange = {handleNameInputChange} 
        placeholder='name'/>

      <input 
        className='popup__input' 
        id='email' 
        type='email' 
        value = {email}
        onChange = {handleEmailInputChange}
        placeholder='email'/>

      <textarea 
        className='popup__textarea' 
        rows='10' 
        cols='45' 
        id='text' 
        type='text' 
        value = {text}
        onChange = {handleTextInputChange}
        placeholder='text'/>

      <button className='popup__btn' type='submit' onClick={handleSubmitBtn} aria-label='Отправить'>Отправить</button>
    </form>
  )
};