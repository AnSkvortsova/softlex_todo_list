import { React, useState, useEffect } from 'react';
import { TasksList } from '../TasksList/TasksList';
import { AddTaskPopup } from '../Popups/AddTaskPopup';
import { LoginPopup } from '../Popups/LoginPopup';

import * as api from '../../utils/api';

function App() {
  const [isTasksLoaded, setIsTasksLoadedState] = useState(false);
  const [isAddTaskPopupOpend, setIsAddTaskPopupOpendState] = useState(false);
  const [isLoginPopupOpend, setIsLoginPopupOpendState] = useState(false);
  const [allTasks, setAllTasksState] = useState([]);

  function handleAddTaskBtn() {
    setIsAddTaskPopupOpendState(true);
  };

  function handleLoginBtn() {
    setIsLoginPopupOpendState(true);
  };

  function closePopup() {
    setIsAddTaskPopupOpendState(false);
    setIsLoginPopupOpendState(false);
  };

  // обработчик Escape и overlay
  useEffect(() => {
    const closeByEscape = (evt) => {
      if(evt.key === 'Escape') {
        closePopup();
      };
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  useEffect(() => {
    const closeByOverlay = (evt) => {
      if(evt.target.classList.contains('popup_opend')) {
        closePopup();
      };
    };
    document.addEventListener('click', closeByOverlay);
    return () => document.removeEventListener('click', closeByOverlay);
  }, []);

  //получаем все задачи
  function checkIsTasksLoaded(allTasks) {
    if(allTasks.length !== 0) {
      setIsTasksLoadedState(true)
    }
  };

  useEffect(() => {
    api.getTasks()
    .then((res) => {
      checkIsTasksLoaded(allTasks)
      if(!isTasksLoaded) {
        setAllTasksState(res.message.tasks)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }, [isTasksLoaded, allTasks]);

  return (
    <div className="app">
      <header className="app__header">To Do List</header>
      <button className='button' onClick={handleAddTaskBtn} type='button' aria-label='Добавить задачу'>Добавить задачу</button>
      <button className='buttom' onClick={handleLoginBtn} type='button' aria-label='Вход'>Вход</button>
      <TasksList 
      allTasks = {allTasks} />

      <AddTaskPopup
      isPopupOpend = {isAddTaskPopupOpend} />
      <LoginPopup
      isPopupOpend = {isLoginPopupOpend} />
    </div>
  );
}

export default App;
