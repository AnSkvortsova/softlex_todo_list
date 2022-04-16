import { React, useState } from 'react';

export function SortTaskPopup(props) {
  const [username, setUsernameState] = useState('');
  const [email, setEmailState] = useState('');
  const [status, setStatusState] = useState('');

  function handleNameInputChange(evt) {
    setUsernameState(evt.target.value);
  };

  function handleEmailInputChange(evt) {
    setEmailState(evt.target.value);
  };

  function handleStatusInputChange(evt) {
    setStatusState(evt.target.value);
  };

  function handleSubmitBtn() {
    props.sortTasks(username, email, status);

    setUsernameState('');
    setEmailState('');
    setStatusState('');
    
    props.closePopup();
  };

  function handleBtn() {
    props.resetSorting();

    setUsernameState('');
    setEmailState('');
    setStatusState('');

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

      <input 
        className='popup__input' 
        type='email' 
        value = {status}
        onChange = {handleStatusInputChange}
        placeholder='status'
        required />

      <button className='popup__btn' type='submit' onClick={handleSubmitBtn} aria-label='Искать'>Искать</button>
      <button className='popup__btn' type='button' onClick={handleBtn} aria-label='Сбросить сортировку'>Сбросить сортировку</button>
    </form>
  )
};