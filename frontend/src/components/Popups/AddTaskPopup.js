import { React, useState } from 'react';

export function AddTaskPopup(props) {
  const [username, setUsernameState] = useState('');
  const [email, setEmailState] = useState('');
  const [text, setTextState] = useState('');
  const [isError, setIsErrorState] = useState(false);

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
    if (username === '' || email === '' || text === '') {
      return setIsErrorState(true);
    };
    
    props.addNewTask({
      username,
      email,
      text 
    })
    setUsernameState('');
    setEmailState('');
    setTextState('');
    setIsErrorState(false);
    props.closePopup();
  };

  return(
    <form className={`popup ${props.isPopupOpend ? 'popup_opend' : ''}`}>
      <input 
        className='popup__input' 
        type='text' 
        value = {username}
        onChange = {handleNameInputChange} 
        placeholder='name'
        required />

      <input 
        className='popup__input' 
        type='email' 
        value = {email}
        onChange = {handleEmailInputChange}
        placeholder='email'
        required />

      <textarea 
        className='popup__textarea' 
        rows='10' 
        cols='45' 
        type='text' 
        value = {text}
        onChange = {handleTextInputChange}
        placeholder='text'
        required />

      <button className='popup__btn' type='submit' onClick={handleSubmitBtn} aria-label='Отправить'>Отправить</button>
      <span className={`popup__err ${isError ? 'popup__err_active' : ''}`}>Все поля должны быть заполнены</span>
    </form>
  )
};