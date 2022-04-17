import { React, useState } from 'react';

export function LoginPopup(props) {
  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const [isError, setIsErrorState] = useState(false);

  function handleNameInputChange(evt) {
    setUsernameState(evt.target.value);
  };

  function handlePasswordInputChange(evt) {
    setPasswordState(evt.target.value);
  };

  function handleSubmitBtn(evt) {
    evt.preventDefault();
    if (username === '' || password === '') {
      return setIsErrorState(true);
    };

    props.login(username, password);

    setUsernameState('');
    setPasswordState('');
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
        type='password' 
        value = {password}
        onChange = {handlePasswordInputChange} 
        placeholder='password'
        required />

      <button className='popup__btn'  type='submit' onClick={handleSubmitBtn} aria-label='Отправить'>Отправить</button>
      <span className={`popup__err ${isError ? 'popup__err_active' : ''}`}>Все поля должны быть заполнены</span>
    </form>
  )
};