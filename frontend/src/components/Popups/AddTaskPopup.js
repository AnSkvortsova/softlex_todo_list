export function AddTaskPopup(props) {
  return(
    <form className={`popup ${props.isPopupOpend ? 'popup_opend' : ''}`}>
      <input className='popup__input' id='name' type='text' placeholder='name'/>
      <input className='popup__input' id='email' type='email' placeholder='email'/>
      <textarea className='popup__textarea' rows='10' cols='45' id='text' type='text' placeholder='text'/>
      <button className='popup__btn' type='submit'>Отправить</button>
    </form>
  )
};