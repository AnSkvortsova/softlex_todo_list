export function LoginPopup(props) {
  return(
    <form className={`popup ${props.isPopupOpend ? 'popup_opend' : ''}`}>
      <input className='popup__input' type='text' placeholder='name'/>
      <input className='popup__input' type='password' placeholder='password'/>
      <button className='popup__btn' type='submit'>Отправить</button>
    </form>
  )
};